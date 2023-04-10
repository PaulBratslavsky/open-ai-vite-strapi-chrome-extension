const fs = require('fs');
const { ApplicationError } = require('@strapi/utils').errors;
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration);
}

module.exports = ({ strapi }) => ({
  
  async openAiRequest(payload, type = "completion") {
    const openai = configureOpenAi(process.env.OPENAI_API_KEY);
    const defaultPrompt = `Expand and Transform Following Short Text Samples into Comprehensive Technical Articles. Must include headings, sections, and bullet points. Provide an intro, and a bullet point outline at the beginning discussing topics covered. Paragraphs should be between 5 to 8 sentences and should have 8 to 10 paragraphs. Add additional information and context to fill out the article. Provide code example when necessary.  Minimum length 2500 words. Return post in markdown:`;

    async function createTranscription(payload) {
      console.log('Transcribing audio file...');

      const audioFile = fs.createReadStream(payload.audioFilePath);
      try {
        const response = await openai.createTranscription(audioFile, "whisper-1");
        console.log(response.data, "response.data")
        return response.data;
      } catch (error) {
        throw new ApplicationError("Invalid audio file: Please provide a valid audio file");
      }
    }

    async function createCompletion(payload) {
      console.log('Summarizing transcript...');

      console.log(defaultPrompt, "defaultPrompt")

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: payload.prompt || 'Prompt: ' + defaultPrompt + " Content: " + payload.content,
        temperature: 0.7,
        max_tokens: 3500,
      });
      console.log(response.data, "response.data")
      return response.data;
    }

    switch (type) {
      case "completion":
        return await createCompletion(payload);
      case "transcription":
        return await createTranscription(payload);
      default:
        throw new ApplicationError("Invalid type: Please provide a valid type");
    }
  },
});
