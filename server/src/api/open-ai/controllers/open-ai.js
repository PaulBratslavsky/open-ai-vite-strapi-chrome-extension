module.exports = ({ strapi }) => ({
  async createVideoSummary(ctx) {

    try {
      const videoFilePath = await strapi
        .services['api::open-ai.utils']
        .downloadVideoFile(ctx);

      const audioFilePath = await strapi
        .services['api::open-ai.utils']
        .convertVideoToAudio(videoFilePath);

      const transcription = await strapi
        .services['api::open-ai.open-ai']
        .openAiRequest({ audioFilePath }, "transcription");

      const content = transcription.text;

      const summary = await strapi
        .services['api::open-ai.open-ai']
        .openAiRequest({ content }, "completion");

      return { data: summary };

    } catch (error) {
      ctx.throw(500, error);
    }
  },

})