
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
  // CORS Setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // API Key Check
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing in server environment variables.");
    return res.status(500).json({ error: 'Server configuration error: API_KEY missing' });
  }

  const { brand, content } = req.body;
  if (!brand || !content) {
      return res.status(400).json({ error: 'Missing brand or content data' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Design Logic
    let styleInstructions = "";
    
    switch (content.templateId) {
        case 'corporate':
            styleInstructions = `
                **STYLE: CORPORATE PRO**
                - Container: 600px width, sharp corners (border-radius: 0), white background.
                - Header: Solid background color (${brand.primaryColor}). Logo left-aligned.
                - Body: Professional grid, clear section dividers.
                - Typography: Clean, formal.
                - Button: Rectangular, no border radius.
            `;
            break;
        case 'newsletter':
            styleInstructions = `
                **STYLE: EDITORIAL NEWSLETTER**
                - Container: 640px max-width, transparent or white background.
                - Header: Minimalist. Centered Logo. Thin line divider below logo.
                - Body: Focus on readability. Large headings, increased line-height.
                - Typography: Serif fonts preferred for headings if available.
                - Button: Ghost button (outline) or simple text link style.
            `;
            break;
        case 'promo':
            styleInstructions = `
                **STYLE: BOLD PROMO**
                - Container: 600px, bright/bold background accents.
                - Header: Large Hero Image area (placeholder).
                - Body: Large font sizes for discount codes. Dashed borders for coupons.
                - Button: Large, high contrast, centered.
                - Colors: Use Secondary color aggressively for accents.
            `;
            break;
        case 'modern':
        default:
            styleInstructions = `
                **STYLE: MODERN CARD**
                - Container: 640px, rounded corners (16px), shadow, floating effect.
                - Header: Linear Gradient (${brand.primaryColor} to ${brand.secondaryColor}).
                - Body: Card-based layout with soft gray backgrounds for sections.
                - Button: Pill shaped (fully rounded).
            `;
            break;
    }

    const languageInstruction = content.language === 'es' 
      ? "The content MUST be in SPANISH." 
      : content.language === 'pt' 
      ? "The content MUST be in PORTUGUESE." 
      : "The content MUST be in ENGLISH.";

    const privacyLinkUrl = brand.privacyPolicyUrl || brand.websiteUrl || '#';

    const prompt = `
      You are an expert HTML Email Developer.
      Create a responsive HTML email compatible with Mailchimp/Outlook.

      ${styleInstructions}

      **Brand:**
      - Name: ${brand.brandName}
      - Logo: ${brand.logoUrl}
      - Colors: ${brand.primaryColor}, ${brand.secondaryColor}
      - Font: ${brand.fontFamily}
      - Privacy Link: ${privacyLinkUrl}

      **Content:**
      - Lang: ${languageInstruction}
      - Topic: ${content.campaignTopic}
      - Msg: ${content.keyMessage}
      - CTA: ${content.ctaText} -> ${content.ctaLink}
      - Tone: ${content.tone}
      - Vars: ${content.customVariables}

      **Requirements:**
      1. HTML5 table-based layout.
      2. Inline CSS.
      3. VML for Outlook buttons.
      4. Responsive (@media max-width:600px).
      5. Include a Footer with the Brand Name and a "Privacy Policy" link pointing to: ${privacyLinkUrl}
      6. **IMPORTANT:** If the design calls for a main image or banner, use the placeholder EXACTLY: {{HERO_IMAGE_SRC}} in the img src attribute.
      
      **Return JSON:**
      {
        "subjectLine": "string",
        "previewText": "string",
        "html": "string (full html code)",
        "plainText": "string"
      }
    `;

    // 1. Generate HTML Content
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subjectLine: { type: Type.STRING },
            previewText: { type: Type.STRING },
            html: { type: Type.STRING },
            plainText: { type: Type.STRING },
          },
          required: ["subjectLine", "previewText", "html", "plainText"],
        },
      },
    });

    let text = response.text;
    if (!text) {
        console.error("Gemini returned empty text.");
        throw new Error("No response from Gemini");
    }
    
    // Robust JSON Parsing: Remove markdown code blocks if present
    text = text.trim();
    if (text.startsWith('```')) {
        text = text.replace(/^```(json)?\n/, '').replace(/```$/, '');
    }

    let generatedData;
    try {
        generatedData = JSON.parse(text);
    } catch (e) {
        console.error("JSON Parse Error. Raw Text:", text);
        throw new Error("Failed to parse AI response. See console for details.");
    }

    // 2. Generate AI Image (If requested)
    if (content.generateImage) {
        try {
            const imagePrompt = content.imagePrompt || `A professional banner image for an email campaign about ${content.campaignTopic}. Style: ${content.tone}. Brand colors: ${brand.primaryColor}`;
            
            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: imagePrompt }],
                },
                config: {
                    imageConfig: {
                        aspectRatio: "16:9"
                    }
                }
            });

            let imageFound = false;
            if (imageResponse.candidates?.[0]?.content?.parts) {
                 for (const part of imageResponse.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64EncodeString = part.inlineData.data;
                        const mimeType = part.inlineData.mimeType || 'image/png';
                        const imageSrc = `data:${mimeType};base64,${base64EncodeString}`;
                        generatedData.html = generatedData.html.replace(/{{HERO_IMAGE_SRC}}/g, imageSrc);
                        imageFound = true;
                        break;
                    }
                 }
            }
            
            if (!imageFound) {
                 // Fallback if no inline data found
                 console.warn("Image generation success but no inline data found.");
                 generatedData.html = generatedData.html.replace(/{{HERO_IMAGE_SRC}}/g, 'https://placehold.co/600x300/e2e8f0/475569?text=Banner+Image');
            }
        } catch (imgError) {
            console.error("Image generation failed:", imgError);
            // Fallback to placeholder if image gen fails
             generatedData.html = generatedData.html.replace(/{{HERO_IMAGE_SRC}}/g, 'https://placehold.co/600x300/e2e8f0/475569?text=Banner+Image');
        }
    } else {
        // Remove placeholder or use default if no image requested
        // Using a generic unsplash placeholder related to business/tech if not generated
         generatedData.html = generatedData.html.replace(/{{HERO_IMAGE_SRC}}/g, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=300&q=80');
    }

    return res.status(200).json(generatedData);

  } catch (error) {
    console.error("Gemini API Error Handler:", error);
    
    // Check for Specific Google Block error
    if (JSON.stringify(error).includes("API_KEY_HTTP_REFERRER_BLOCKED")) {
        return res.status(500).json({ 
            error: "Security Config Error: Please go to Google AI Studio -> API Keys -> Edit Key -> Set 'Application Restrictions' to 'None' for this environment." 
        });
    }

    return res.status(500).json({ error: error.message || 'Failed to generate template' });
  }
}
