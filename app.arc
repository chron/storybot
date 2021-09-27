@app
slothbot

@scheduled
# These times are in UTC and will therefore break horribly during DST 😰
daily-standup cron(15 19 * * ? *)
daily-standdown cron(45 1 * * ? *)
meme-of-the-week cron(0 21 ? * THU *)

@http
get /memes
post /command/prs
post /command/slothbot

@tables
memes
  memeID *String
  createdAt String
  createdBy String
  isPosted Bool
  url String

@aws
profile slothsquad
region ap-southeast-2
