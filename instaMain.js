require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const tag = require('./info.json')
const image = "./public/output.jpg"
const titles = require('./title.json')

const ig = new IgApiClient();

async function login() {
  // basic login-procedure
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

const imagePost = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);

  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  await ig.publish.photo({
      file: await readFileAsync(image),
      caption: `${titles}` + '\n. \n. \n. ' + tag.captions,
  });
};

const videoPost = async () => {
  await login();

  const videoPath = './public/mainvideo.mp4';
  const coverPath = './public/thumbnail.jpg';

  const publishResult = await ig.publish.video({
    // read the file into a Buffer
    video: await readFileAsync(videoPath),
    coverImage: await readFileAsync(coverPath),
    caption: `${titles}` + ' \n. \n. \n. ' + tag.captions


  });

  console.log(publishResult);
};

module.exports = {imagePost, videoPost}
 


