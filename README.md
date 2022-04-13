Endpoint for API: https://dnubt0vena.execute-api.us-east-1.amazonaws.com/takehome/cat

- Code is deployed to Lambda behind an API Gateway
![API Gateway with Lambda proxy integration](docs/Screen%20Shot%202022-04-12%20at%2011.23.16%20PM.png)
![Enable binary media types](docs/Screen%20Shot%202022-04-12%20at%2011.23.56%20PM.png)

- Location of the API key in AWS Secrets Manager is kept in an environment variable
![Lambda function](docs/Screen%20Shot%202022-04-12%20at%2011.24.48%20PM.png)

- The Lambda is only given permission to retrieve this specific secret value
![Permissions limitation](docs/Screen%20Shot%202022-04-12%20at%2011.25.39%20PM.png)
![IAM Policy](docs/Screen%20Shot%202022-04-12%20at%2011.26.20%20PM.png)
![Secret manager](docs/Screen%20Shot%202022-04-12%20at%2011.27.27%20PM.png)

If this had been a production application I would have:
- Added tests
- Move the dependancies to a Lambda layer as they're likely shared with other functions
- Encrypt the API key in Secrets Manager with a customer managed key
- Enable XRay tracing

**The way the code is split is overkill for such a small function; however, I wanted to give some insight as how I split up my code when working on larger projects.**