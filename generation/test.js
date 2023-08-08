const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
console.log("api", process.env.OPEN_AI_API);
(async () => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Once upon a time in a land far, far away...",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
