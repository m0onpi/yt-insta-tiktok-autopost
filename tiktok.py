import sys
sys.path.append('../')
from Tiktok_uploader import uploadVideo

'''session_id = "99211a0ff692c9f20742f050beb2cccf"
file = "videoReel.mp4"
title = "anon is french"
tags = ["greentext", "funny", "fyp"]
schedule_time = 1672592400'''

# Publish the video
uploadVideo(session_id, file, title, tags, verbose=True)
# Schedule the video
###uploadVideo(session_id, file, title, tags, schedule_time, verbose=True)