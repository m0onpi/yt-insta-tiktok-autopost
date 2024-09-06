const fileType = require('./filetype.json'); // Ensure 'filetype.json' has a correct structure
const execSync = require('child_process').execSync;
require("dotenv").config();

const pointer = () => {
    try {
        const type = fileType; // Adjust this line based on the actual structure of 'filetype.json'

        if (type === "image") {
            console.log('This is an image type');
            
            // Generate thumbnail for image type in 9:16 format
            const thumbnail = execSync("ffmpeg -y -i public/imagevideo.mp4 -vf scale=1080:1920 -vframes 1 public/thumbnail.png");
            console.log('Thumbnail created for image type:', thumbnail.toString());
            
            // Strip metadata from the thumbnail
            execSync('ffmpeg -y -i public/thumbnail.png -map_metadata -1 public/thumbnail_stripped.png');
            console.log('Metadata stripped from thumbnail for image type');
        }

        if (type === "hosted:video" || type === "rich:video") {
            console.log('This is a video type');

            // Convert and resize video to social media optimized format
            const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -vf "scale=1080:1920,format=yuv420p" -c:v libx264 -preset fast -c:a aac -b:a 128k -shortest -movflags +faststart -map_metadata -1 public/mainvideo.mp4', { encoding: 'utf-8' });
            console.log('Video processed for video type:', output);

            // Generate thumbnail for the video
            const thumbnail = execSync('ffmpeg -y -i public/mainvideo.mp4 -vf "scale=1080:1920" -vframes 1 public/thumbnail.jpg', { encoding: 'utf-8' });
            console.log('Thumbnail created for video type:', thumbnail);

            // Strip metadata from the thumbnail
            execSync('ffmpeg -y -i public/thumbnail.jpg -map_metadata -1 public/thumbnail_stripped.jpg');
            console.log('Metadata stripped from thumbnail for video type');
        }

        if (type === "link") {
            console.log('This is a link type');

            // Convert and resize video to social media optimized format
            const output = execSync('ffmpeg -y -i public/videovideo.mp4 -i public/videovideo.mp3 -vf "scale=1080:1920,format=yuv420p" -c:v libx264 -preset fast -c:a aac -b:a 128k -shortest -movflags +faststart -map_metadata -1 public/mainvideo.mp4', { encoding: 'utf-8' });
            console.log('Video processed for link type:', output);

            // Generate thumbnail for the video
            const thumbnail = execSync('ffmpeg -y -i public/mainvideo.mp4 -vf "scale=1080:1920" -vframes 1 public/thumbnail.jpg', { encoding: 'utf-8' });
            console.log('Thumbnail created for link type:', thumbnail);

            // Strip metadata from the thumbnail
            execSync('ffmpeg -y -i public/thumbnail.jpg -map_metadata -1 public/thumbnail_stripped.jpg');
            console.log('Metadata stripped from thumbnail for link type');
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

pointer();
