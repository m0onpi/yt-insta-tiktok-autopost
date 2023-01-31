from Tiktok_uploader import uploadVideo
import json 
import random 

with open('info.json') as f:
   info = json.load(f)

with open('title.json') as g:
   titlevalue = json.load(g)

with open('filetype.json') as h:
   filetype = json.load(h)



mainthree = info["mainthree"]
shuffled = random.shuffle(mainthree)

session_id = info["tiktoksessionid"]
title = titlevalue
tags = shuffled

if (filetype == "hosted:video"):
   file = './public/imagevideo.mp4'
   uploadVideo(session_id, file, title, tags, verbose=True)


if (filetype == "image"):
   file = './public/mainvideo.mp4'
   uploadVideo(session_id, file, title, tags, verbose=True)


if (filetype == "link"):
   file = './public/mainvideo.mp4'
   uploadVideo(session_id, file, title, tags, verbose=True)

# Publish the video
# uploadVideo(session_id, file, title, tags, verbose=True)

# Schedule the video
###uploadVideo(session_id, file, title, tags, schedule_time, verbose=True)