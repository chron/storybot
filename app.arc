@app
slothbot

@scheduled
# These times are in UTC and will therefore break horribly during DST 😰
daily-standup cron(15 20 * * ? *)
daily-standdown cron(15 3 * * ? *)

@aws
profile slothsquad
region ap-southeast-2
