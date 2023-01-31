const type = require('./filetype.json')
const execSync = require('child_process').execSync;
const sharp = require('sharp')
const {videoPost, imagePost} = require('./instaMain');
const { upload } = require('youtube-videos-uploader'); //vanilla javascript
const titles = require('./title.json')
require("dotenv").config();
const tag = require('./info.json')

sharp('./public/thumbnail.jpg')
.resize({
fit: sharp.fit.contain,
width:1080,
height:1920})

.toFile('./public/truethumbnail.jpg'), (error, info) => {
if (error) {
console.error(error)
} else {
console.log('Image blurred successfully');

};
}

let tagsshuffled = tag.mainthree
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
console.log(tagsshuffled)

const threetags = (tagsshuffled.toString()).replace(/,/g, " ")


const credentials = { email: tag.email, pass: tag.password}

// minimum required options to upload video
const imagevideo = { path: './public/imagevideo.mp4', title: `${titles}` + ' ' + threetags ,description: tag.description + tag.captions,isAgeRestriction: false, isNotForKid: true}
const videovideo =  { path: './public/mainvideo.mp4', title: `${titles}` + ' ' + threetags ,description: tag.description + tag.captions,isAgeRestriction: false, isNotForKid: true}
///const video2 = { path: 'video2.mp4', title: 'title 2', description: 'description 2', thumbnail:'thumbnail.png', language: 'english', tags: ['video', 'github'], playlist: 'playlist name', channelName: 'Channel Name', onSuccess:onVideoUploadSuccess, skipProcessingWait: true, onProgress: (progress) => { console.log('progress', progress) }, uploadAsDraft: false, isAgeRestriction: false, isNotForKid: false }

const pointer = () => {
    if (type === "image"){
        console.log('This is an image type')
        imagePost();
        upload (credentials, [imagevideo]).then(console.log)

    }
    if (type === "hosted:video"|| type === "rich:video"){
        const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -c:v copy -c:a aac public/mainvideo.mp4', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log(output);
        videoPost();
        upload (credentials, [videovideo]).then(console.log)

        console.log('This is an video type')
    }
    if (type === "link"){
        const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -c:v copy -c:a aac public/mainvideo.mp4', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log(output);
        videoPost();
        upload (credentials, [videovideo]).then(console.log)
        console.log('This is an link type')
    }
}

pointer();