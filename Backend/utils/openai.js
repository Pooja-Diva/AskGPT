import "dotenv/config";
import fetch from "node-fetch"; 

const getOllamaResponse = async(message) => {
    
       const prompt = `User: ${message}\nAssistant:`;
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.OLLAMA_API_URL}`
            },
            body: JSON.stringify({
                model: process.env.OLLAMA_MODEL || "mistral",
                prompt: prompt,
                stream: false,
                messages: [{
                    role: "user",
                    content: message
                }]
            })
        };
    
        try {
             const response = await fetch(process.env.OLLAMA_API_URL, options);
const text = await response.text();

let data;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error(" Failed to parse JSON from Ollama:", text);
  return " Invalid JSON from Ollama.";
}

return data?.response || " No response field from Ollama.";

        } catch (err) {
              console.error("Error fetching from Ollama:", err);
        return " Failed to get response from local model.";
        }
};

export default getOllamaResponse;