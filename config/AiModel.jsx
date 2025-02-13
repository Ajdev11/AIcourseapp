const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Learn Python: as you are coaching teacher\n- user want to learn about the topic\n- Generate 5-7 course tilte for study(short)\n- Make sure it is related to topic description \n- Output would be array of string JSON format only\n- Do not add any plain text in output",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  "Python Basics: A Gentle Introduction",\n  "Data Structures in Python",\n  "Object-Oriented Programming with Python",\n  "Python for Data Analysis: A Beginner\'s Guide",\n  "Web Development with Python and Flask",\n  "Automating Tasks with Python",\n  "Python for Machine Learning Fundamentals"\n]\n```',
        },
      ],
    },
  ],
});



export const GenerateCourseAIModel = model.startChat({
  generationConfig,
  history: [
    
  ],
});
