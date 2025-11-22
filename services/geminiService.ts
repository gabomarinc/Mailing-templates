import { GoogleGenAI, Type } from "@google/genai";
import { BrandConfig, ContentConfig, GeneratedTemplate } from "../types";

export const generateEmailTemplate = async (
  brand: BrandConfig,
  content: ContentConfig
): Promise<GeneratedTemplate> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Determine language instruction
  const languageInstruction = content.language === 'es' 
    ? "The content of the email (headers, body, buttons) MUST be written in SPANISH." 
    : content.language === 'pt' 
    ? "The content of the email (headers, body, buttons) MUST be written in PORTUGUESE." 
    : "The content of the email (headers, body, buttons) MUST be written in ENGLISH.";

  const prompt = `
    You are an expert HTML Email Developer.
    Your task is to create a production-ready, responsive HTML email template compatible with Mailchimp, Brevo, and Outlook.
    
    **Design Directive:**
    You MUST follow a specific visual style: "The Modern Card Style".
    - **Container**: Centered 640px wide, white background, rounded corners (16px), shadow effect.
    - **Header**: Gradient background using the brand's Primary and Secondary colors. White text for contrast.
    - **Typography**: You MUST use this font stack: "${brand.fontFamily || 'Arial, Helvetica, sans-serif'}".
    - **Cards**: Use secondary content blocks with light background colors (e.g., #f8fafc) and borders.
    - **Buttons**: Full-width or large rounded buttons with the brand gradient. MUST include VML code for Outlook compatibility.

    **User Brand Configuration:**
    - Brand Name: ${brand.brandName}
    - Logo URL: ${brand.logoUrl || "https://via.placeholder.com/150x50/ffffff/000000?text=LOGO"}
    - Primary Color (Gradient Start): ${brand.primaryColor}
    - Secondary Color (Gradient End): ${brand.secondaryColor}
    - Background Color (Page): ${brand.backgroundColor}
    - Website: ${brand.websiteUrl}
    - Font Family: ${brand.fontFamily}

    **Content Context:**
    - Language: ${languageInstruction}
    - Campaign Topic: ${content.campaignTopic}
    - Key Message: ${content.keyMessage}
    - Audience: ${content.audience}
    - CTA Button: "${content.ctaText}" -> ${content.ctaLink}
    - Tone: ${content.tone}
    - Custom Variables: ${content.customVariables || "None provided"}

    **Strict Output Requirements:**
    1. **Structure**:
       Use a standard HTML5 doctype but table-based layout for email clients.
       The \`<html>\` tag must include \`xmlns:v="urn:schemas-microsoft-com:vml"\` and \`xmlns:o="urn:schemas-microsoft-com:office:office"\`.
       Set the lang attribute correctly (e.g. lang="es" if Spanish).
    
    2. **Reference Template Structure (Mimic this architecture):**
       \`\`\`html
       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
         <tr>
           <td align="center" style="padding: 24px;">
             <!-- Main Card -->
             <table role="presentation" class="container" width="640" style="width:640px; max-width:640px; background:#ffffff; border-radius:16px; overflow:hidden;">
               <!-- Gradient Header -->
               <tr>
                 <td style="padding:0; background:linear-gradient(135deg, ${brand.primaryColor}, ${brand.secondaryColor});">
                   <!-- Logo & Headline content goes here with white text -->
                 </td>
               </tr>
               <!-- Content Body -->
               <tr>
                 <td style="padding:32px; font-family: ${brand.fontFamily};">
                   <!-- Intro Text -->
                   <!-- Info Cards (light bg #f8fafc) -->
                   <!-- Gradient Button (VML + Anchor) -->
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
       \`\`\`

    3. **Styling**:
       - All CSS must be INLINED.
       - Apply \`font-family: ${brand.fontFamily}\` to all text elements (td, p, h1, h2, span, a).
       - Include a \`<style>\` block in the head ONLY for media queries (max-width: 640px) to make the container fluid (width: 100% !important) on mobile.
    
    4. **Content Generation**:
       - Write professional and engaging copy based on the 'Tone' and 'Topic' in the requested LANGUAGE.
       - Create a catchy headline for the header section.
       - Summarize key points in an "Info Card" style section.
       - **VARIABLES**: If "Custom Variables" are provided above (e.g., "idea, step_number"), you MUST incorporate them into the HTML and Plain Text as handlebars/mustache placeholders like \`{{idea}}\` or \`{{step_number}}\`. Place them where they make logical sense in the context of the email content (e.g. "Your idea: {{idea}}"). Do not invent values for them, keep the mustache syntax.
       - **PLAIN TEXT**: Also generate a Plain Text version of the email content that includes the links and the variable placeholders, suitable for the MIME text/plain part.

    **Return Data:**
    Return a JSON object strictly matching this schema:
    {
      "subjectLine": "Subject line here",
      "previewText": "Preheader text here",
      "html": "The complete HTML string starting with <!doctype html>...",
      "plainText": "The plain text version of the email..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text) as GeneratedTemplate;
    return data;

  } catch (error) {
    console.error("Error generating email template:", error);
    throw error;
  }
};