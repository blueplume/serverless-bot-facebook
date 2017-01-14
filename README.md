# Serverless-bot-facebook
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This is the same Facebook bot from [jw84/messenger-bot-tutorial](https://github.com/jw84/messenger-bot-tutorial), but adapted to [AWS Serverless v1.0](https://serverless.com/)

To get this running (assuming that AWS serverless has been setup):

1. `npm install`
2. `sls deploy`, and you will get a screen:

	```
	Service Information
	service: serverless-bot-facebook
	stage: dev
	region: us-east-1
	api keys:
	  None
	endpoints:
	  GET - https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/webhook
	  POST - https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/webhook
	functions:
	  serverless-bot-facebook-dev-get: arn:aws:lambda:us-east-1:12345:function:serverless-bot-facebook-dev-get
	  serverless-bot-facebook-dev-set: arn:aws:lambda:us-east-1:12345:function:serverless-bot-facebook-dev-set
	```

3. Follow the instructions in [Setup the Facebook App](https://github.com/jw84/messenger-bot-tutorial#setup-the-facebook-app). Instead of the Heroku URL, use the Serverless URL from `sls deploy` instead. Remember the token FB gives in step 3
4. Change `serverless.yml`, change value of `FB_PAGE_ACCESS_TOKEN` to that token
5. `sls deploy` again
5. Browse your page and chat!