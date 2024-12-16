import express from "express";
import { config } from "dotenv";

// Load environment variables
config();

// Create Express app
const app = express();
const PORT = process.env.PORT;

// CORS middleware
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));


// openai middleware
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const chatCompletion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": "Hello!"}],
});
console.log(chatCompletion.choices[0].message);


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
