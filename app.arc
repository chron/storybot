@app
slothbot

@scheduled
# These times are in UTC and will therefore break horribly during DST 😰
# NZST - use 30 20 * * ? *
# NZDT - use 30 19 * * ? *
daily-standup cron(30 19 * * ? *)

@http
get /prs
post /command/prs

@aws
profile weka-deploy
region ap-southeast-2
