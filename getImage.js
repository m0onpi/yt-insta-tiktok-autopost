const axios = require('axios');
var fs = require('fs');
const FFmpeg  = require('fluent-ffmpeg')
var videoshow = require('videoshow')
var  sharp = require('sharp')
var finalVideoPath = './public/imagevideo.mp4'
const tag = require('./info.json')

const getimage = async () =>  {
  axios.get(`https://www.reddit.com/r/${tag.redditname}/top/.json?t=day`)
  .then(response => {
    const firstPost = response.data.data.children[1].data;
    const title = firstPost.title;
    const imageUrl = firstPost.url;
    const fileType = firstPost.post_hint
    console.log(firstPost)
    const thumbnail = firstPost.thumbnail
    axios({
      method: 'get',
      url: thumbnail,
      responseType: 'stream'
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(`./public/thumbnail.jpg`));
      })
      .catch(error => {
        console.log(error);
      });
    
    console.log(fileType)
    fs.writeFile("title.json",JSON.stringify(title), err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
      }})
      fs.writeFile("filetype.json",JSON.stringify(fileType), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
        }})  
      if (firstPost.post_hint === "hosted:video" ) {
        axios({
          method: 'get',
          url: firstPost.media.reddit_video.fallback_url,
          responseType: 'stream'
        })
          .then(response => {
            response.data.pipe(fs.createWriteStream(`./public/videovideo.mp4`));
          })
          .catch(error => {
            console.log(error);
          });
        axios({
          method: 'get',
          url: firstPost.url +'/DASH_audio.mp4',
          responseType: 'stream'
        })
          .then(response => {
            response.data.pipe(fs.createWriteStream(`./public/videovideo.mp3`));
          })
          .catch(error => {
            console.log(error);
          });
    }       if (firstPost.post_hint === "link") {
      axios({
        method: 'get',
        url: firstPost.preview.reddit_video_preview.fallback_url,
        responseType: 'stream'
      })
        .then(response => {
          response.data.pipe(fs.createWriteStream(`./public/videovideo.mp4`));
        })
        .catch(error => {
          console.log(error);
        });
      axios({
        method: 'get',
        url: firstPost.url +'/DASH_audio.mp4',
        responseType: 'stream'
      })
        .then(response => {
          response.data.pipe(fs.createWriteStream(`./public/videovideo.mp3`));
        })
        .catch(error => {
          console.log(error);
        }); 
    
   }else       
   if (firstPost.post_hint === "rich:video") {
    axios({
      method: 'get',
      url: firstPost.preview.reddit_video_preview.fallback_url,
      responseType: 'stream'
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(`./public/videovideo.mp4`));
      })
      .catch(error => {
        console.log(error);
      });
      const audioUrl = firstPost.preview.reddit_video_preview.fallback_url.replace("DASH_480.mp3","DASH_audio.mp4")

    axios({
      method: 'get',
      url: audioUrl,
      responseType: 'stream'
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(`./public/videovideo.mp3`));
      })
      .catch(error => {
        console.log(error);
      }); 
  
 }else 
   
   if (firstPost.post_hint === "image") {

    
    var http = require('http')
    var https = require('https')                                               
    Stream = require('stream').Transform                                  
    https.request(imageUrl, function(response) {                                        
    var data = new Stream();                                                    

    response.on('data', function(chunk) {                                       
    data.push(chunk);                                                         
    });                                                                         

    response.on('end', function() {                                             
    fs.writeFileSync('./public/image.jpg', data.read());     
    const resize = async () =>{
      sharp('./public/image.jpg')
      .resize({
          fit: sharp.fit.contain,
          width:1080,
          height:1920})
    
      .toFile('./public/output.jpg'), (error, info) => {
      if (error) {
          console.error(error)
      }
    }};
    
    
    var videoOptions = {
      fps: 24,
      transition: false,
      videoBitrate: 2048 ,
      videoCodec: 'libx264', 
      size: '1080x1920',
      format: 'mp4' 
    }
    
    var images = [
      {path: "./public/output.jpg", loop: 15}
    ]
    const make = async () => {
    videoshow(images, videoOptions)
    .save(finalVideoPath)
    .on('start', function (command) { 
      console.log('encoding ' + finalVideoPath + ' with command ' + command) 
    })
    .on('error', function (err, stdout, stderr) {
      return Promise.reject(new Error(err)) 
    })
    .on('end', function (output) {
      // do stuff here when done
    })
    };
    
    resize();
    make();                          
    });
                                                                         
    }).end(); 

  }})
    .catch(error => {
    console.log(error);
  });
  console.log("Content has been stolen")
};

getimage();

