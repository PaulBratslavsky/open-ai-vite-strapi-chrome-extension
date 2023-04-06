module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/open-ai/summarize',
      handler: 'open-ai.createVideoSummary',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
