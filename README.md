# Sloth-bot 9000
## New fancy arc.codes edition!

Currently consists of two scheduled tasks, one for the morning standup and one for the afternoon stand-down.  They live in src/scheduled.

Most of the code is in /shared to keep things DRY.  Don't expect anything life-changing!

The Github access is done using their GraphQL API.

## Deploying to AWS

You'll need an AWS profile called `slothsquad` set up in your `~/.aws/credentials`.  You'll also need to set up a few environment variables:

| Variable | Description |
| -------- | ----------- |
| SLACK_WEBHOOK | The full URL of the Slack webhook to use for sending messages. |
| SLACK_CHANNEL | Which channel to post to — can also be a user like `@paul` for testing. |
| GITHUB_PERSONAL_ACCESS_TOKEN | Github token to use when searching for PR info. |

Once you have that in place you can run

```
npm run deploy
```

Which will deploy the Staging stack. Add `--production` to deploy to the Production stack.
