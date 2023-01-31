from Tiktok_uploader import uploadVideo
import json 
import random 
import requests
with open('info.json') as f:
   info = json.load(f)

with open('title.json') as g:
   titlevalue = json.load(g)

url = "https://www.tiktok.com/login/phone-or-email/email"
payload = {'username': 'sigma_greentext', 'password': 'thisisgreentextbot123'}
with requests.session() as s:
    # fetch the login page
    s.get(url)

    # post to the login form
    r = s.post(url1, data=payload)
    print(r.text)


mainthree = info["mainthree"]
shuffled = random.shuffle(mainthree)
print(mainthree)

session_id = "99211a0ff692c9f20742f050beb2cccf"
file = "public/videoReel.mp4"
title = titlevalue
tags = shuffled
##schedule_time = 1672592400

# Publish the video
##uploadVideo(session_id, file, title, tags, verbose=True)
# Schedule the video
###uploadVideo(session_id, file, title, tags, schedule_time, verbose=True)