# fCC APIs and Microservices [URL Shortener Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice) Project

Project challenge for freeCodeCamp's APIs and Microservices Certification

This application primarily utilizes basic Node and Express.

## User Stories
* You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`
* When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.
* If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

## Executing the application
** Requires own MongoDB collection URI and config due to `process.env['MONGO_URI']`
* git clone/download repo
* `cd` into local project directory
* configure `const MONGO_URI` for own db collection
* `npm install`
* `npm start`
* Open [localhost:3000](http://localhost:3000) in browser (default port in settings)

## Replit Example
[Spotlight](https://replit.com/@allemandi/fCC-URL-Shortener-Microservice-Project)

The [demo can be found here](https://fCC-URL-Shortener-Microservice-Project.allemandi.repl.co)
