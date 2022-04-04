@app
slothbot

@scheduled
# These times are in UTC and will therefore break horribly during DST 😰
daily-standup cron(15 20 * * ? *)
daily-standdown cron(45 2 * * ? *)
meme-of-the-week cron(0 22 ? * THU *)

@http
get /memes
get /prs
post /command/prs
post /command/meme

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
