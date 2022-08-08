@app
slothbot

@scheduled
# These times are in UTC and will therefore break horribly during DST 😰
daily-standup cron(30 20 * * ? *)

@http
get /prs
post /command/prs

@aws
profile weka-deploy
region ap-southeast-2
