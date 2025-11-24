
import { BrandConfig, ContentConfig, GeneratedTemplate } from "../types";

export const generateEmailTemplate = async (
  brand: BrandConfig,
  content: ContentConfig
): Promise<GeneratedTemplate> => {
  
  // Call our own Vercel Backend
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brand, content }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data as GeneratedTemplate;
};
