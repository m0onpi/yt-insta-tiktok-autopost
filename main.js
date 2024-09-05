const type = require('./filetype.json')
const execSync = require('child_process').execSync;
const titles = require('./title.json')
require("dotenv").config();


const pointer = () => {
    if (type === "image"){
        console.log('This is an image type')
        const thumbnail = execSync("ffmpeg -y -i public/imagevideo.mp4 -vframes 1 public/thumbnail.png");
        console.log(thumbnail);

    }
    if (type === "hosted:video"|| type === "rich:video"){
        const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -c:v copy -c:a aac public/mainvideo.mp4', { encoding: 'utf-8' });  // the default is 'buffer'
        const thumbnail = execSync('ffmpeg -y -i public/mainvideo.mp4 -vframes 1 public/thumbnail.jpg', { encoding: 'utf-8' });
        console.log(output);
        console.log(thumbnail);

        console.log('This is an video type')
    }
    if (type === "link"){
        const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -c:v copy -c:a aac public/mainvideo.mp4', { encoding: 'utf-8' });  // the default is 'buffer'
        const thumbnail = execSync('ffmpeg -y -i public/mainvideo.mp4 -vframes 1 public/thumbnail.jpg', { encoding: 'utf-8' });
        console.log(output);
        console.log(thumbnail);

        console.log('This is an link type')
    }
}

pointer();