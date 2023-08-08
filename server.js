const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

// Configure your OpenAI API key
// const OPENAI_API_KEY = "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";
// openai.apiKey = OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: "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",
});

app.post("/generate_explanation", (req, res) => {
  const { title, chart_type, x_title, x_value, y_title, y_value } = req.body;

  // Generate the prompt for GPT-3
  const prompt = `Explain the ${chart_type} chart titled '${title}' with ${x_title}=${x_value} and ${y_title}=${y_value}.`;

  // Call the GPT-3 model to generate explanation
  generateUsingOpenAI(prompt)
    .then((explanation) => {
      res.json({ explanation });
    })
    .catch((error) => {
      console.error("Error generating explanation:", error.response.data);
      res
        .status(500)
        .json({ error: "An error occurred while generating explanation." });
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function generateUsingOpenAI(prompt) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text.trim();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
