import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch"; 
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}


// app.post("/test", async (req, res) => {
//     const userMessage = req.body.message;

//     const chatHistory = [
//         { role: "user", content: userMessage }
//     ];

//     const prompt = chatHistory
//         .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
//         .join("\n") + "\nAssistant:";

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model:  process.env.OLLAMA_MODEL, 
//             prompt: prompt,
//             stream: false
//         })
//     };

//     try {
//         console.log("API URL being used:", process.env.OLLAMA_API_URL);
//         const response = await fetch(process.env.OLLAMA_API_URL, options);
//         const data = await response.json();
//         res.send({ role: "assistant", content: data.response });
//     } catch (err) {
//         console.error("Ollama error:", err);
//         res.status(500).send({ error: "Failed to get response from Ollama" });
//     }
// });
