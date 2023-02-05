# yt-insta-tiktok-autopost

`clone `

`npm i `

Main Setup:
1.
-create a info.json file including:
   
   `{
 "captions":   "", // hastags 
 "mainthree": [], // top 3 hashatgs
 "description" : "", // description for youtube 
 "redditname" :"" , // reddit name to scrape from
 "email" : "",// youtube email
 "password":"", // youtube password 
 "tiktoksession" : "" //sessionid from tiktok mainpage in cookies
}`

Make sure files can read this file by changing the pointer to whatever you call your json file

2.
- Create .env file 
  // not in string form 
  IG_USERNAME = 
  IG_PASSWORD = 
  
3. Make a public directory within to store the images/ vidoes it needs to edit

4. Make sure default upload settings on your youtube account are set to public

5. ./start.sh in terminal to run 
