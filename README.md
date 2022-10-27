# Story-bot 9000

[![Storybot Deploy](https://github.com/storypark/storybot/actions/workflows/main.yml/badge.svg)](https://github.com/storypark/storybot/actions/workflows/)

## Powering Giraffe and Weka squads in Slack

Currently consists of two scheduled tasks, one for the morning standup and one for the afternoon stand-down.  They live in src/scheduled.

Most of the code is in /shared to keep things DRY.  Don't expect anything life-changing!

The Github access is done using their GraphQL API.

## Deploying to AWS

You'll need an AWS profile called `weka-deploy` set up in your `~/.aws/credentials`.  You'll also need to set up a few environment variables:

| Variable | Description |
| -------- | ----------- |
| \<team\>_WEBHOOK | The full URL of the Slack webhook to use for sending messages. Check `src/shared/config.js` for valid teams|
| SPGITHUB_TOKEN | Github token to use when searching for PR info. |

These should be put in a `.env` file at the root of the project. Process.Env is used to pick these up. The `.env` is in `.gitignore` so it can't be checked in. The production values are stored as secrets in the Github Repo itself - you can overwrite them, but not view them.

Once you have that in place you can run

```
npm install
npm run deploy
```

Which will deploy the Staging stack. Add `--production` to deploy to the Production stack.

## New Starters
Update `src/shared/users.js` with your github username and slack id, and if you're feeling adventurous update your team's config in `src/shared/config.js`