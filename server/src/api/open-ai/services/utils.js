
const ytdl = require('ytdl-core');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

const crypto = require('crypto');

function generateUniqueFilename() {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  return `temp-video-${timestamp}-${randomString}.mp4`;
}

module.exports = ({ strapi }) => ({
  async downloadVideoFile(ctx) {
    console.log('Downloading video...');
    console.log(ctx.request.body.url, "ctx.request.body.url")
    if (!ctx.request.body.url) ctx.throw(400, 'Please provide a video url');
    if (!ytdl.validateURL(ctx.request.body.url)) ctx.throw(400, 'Please provide a valid video url');
  
    const videoUrl = ctx.request.body.url;
    const fileName = generateUniqueFilename();
  
    const outputFile = path.join(os.tmpdir(), fileName);
  
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  
    const videoStream = ytdl.downloadFromInfo(info, { format });
    const writeStream = fs.createWriteStream(outputFile);
  
    return new Promise((resolve, reject) => {
      videoStream.pipe(writeStream);
      writeStream.on('close', () => {
        console.log('Video downloaded!');
        resolve({ outputFile, format });
      });
  
      videoStream.on('error', (error) => {
        console.error('Error downloading video:', error);
        reject(error);
      });
    });
  },
  
  async convertVideoToAudio({ videoFilePath, format }) {
    const outputFile = path.join(os.tmpdir(), `${path.parse(videoFilePath).name}.mp3`);
  
    return new Promise((resolve, reject) => {
      ffmpeg(videoFilePath)
        .inputFormat(format.container)
        .noVideo()
        .audioCodec('libmp3lame')
        .audioChannels(2)
        .audioBitrate('160k')
        .audioFrequency(48000)
        .save(outputFile)
        .on('error', (error) => {
          console.error('FFmpeg error:', error);
          reject(error);
        })
        .on('end', () => {
          console.log('FFmpeg process completed');
          fs.unlinkSync(videoFilePath); // remove the temporary video file
          resolve(outputFile);
        });
    });
  }
  
});
