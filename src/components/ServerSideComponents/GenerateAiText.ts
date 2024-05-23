const { GoogleGenerativeAI } = require("@google/generative-ai");

export const GenerateApiResponse = async (prompt:any) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
        
    } catch (error) {
            console.log(error);
    }
}
