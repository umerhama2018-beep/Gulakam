import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(flower-75d52);

export async function analyzePlantImage(base64Image: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Analyze this plant leaf image. Identify the plant and any diseases. Provide the name of the plant, the disease (if any), and a brief treatment suggestion in Kurdish language.";

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: base64Image.split(",")[1], mimeType: "image/jpeg" } },
  ]);
  return result.response.text();
}
