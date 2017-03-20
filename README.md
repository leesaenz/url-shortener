# URL Shortener API

This application is a versioned released project for Full Sail that will meet iterations as time goes on.  The purpose of this app is to allow a user to input a URL and have a shortened URL generated for them. 

## Versions

###v1 First Iteration: Static API
No web interface and just a simple static API.  The idea is to take the id generated by the database and convert it to an alphanumeric short number for a short URL.  However, since there is no database yet, this url ID is simply hardcoded as a query like so,

```
http://localhost:3000/api/v1/url/33909024
```

Which will return something like this:
```
{"short_url":"http://ur.l/3ZMYm","long_url_id":"33909024"}
```

Next phase, when we get the user's input URL and add it to a URL object in the DB, we can simply pull that ID dynamically and also return the user's original URL.

### v1 Second Iteration: Dynamic API
In this iteration, urls will be added, updated, read, and deleted from the database using the HTTP methods and endpoints in the Endpoints section below.

#### GET
```
GET /api/v1/urls
```
```
Returns:
{
  "urls": [
    {
      "_id": "58c1d09fa28fa39cbd04db27",
      "longurl": "www.rottentomatoes.com",
      "shorturl": "3CE9QB2u",
      "__v": 0
    },
    {
      "_id": "58c1d177010aa89cd1542f84",
      "longurl": "www.adobe.com",
      "shorturl": "74kda048dz",
      "__v": 0
    },
    {
      "_id": "58c1d18e010aa89cd1542f85",
      "longurl": "www.adobe.com",
      "shorturl": "MobafEUhe",
      "__v": 0
    }
  ]
}
```

#### POST (CREATE)
```
POST /api/v1/urls
```
```
Returns
{
  "URL added! :)"
}

```

#### POST (UPDATE)
```
POST /api/v1/urls/id
```
```
Returns
{
  "URL udpated!"
}

```

#### DELETE
```
POST /api/v1/urls/id
```
```
Returns
{
  "Deleted URL! :)"
}
```

## Installation

- Clone the repo into your own directory using `git clone https://github.com/leesaenz/url-shortener.git
`.
- Run `npm i` to install dependencies

## Running the App in Development Mode

To run the application

- run `mongod`
- run `npm start`

In the command terminal, you should see the log

```
Server is running in development on port 3000
Mongo connected in development...
```

## Ruynning the App in Production Mode

To run the application in production
-run `mongod`
-run `npm run prod`

In the command terminal, you should see the log

```
Server is running in production on port 3000
Mongo connected in production...
```

## ESLinting

To lint the app, run `npm run lint`

## Unit Testing

To run Mocha unit tests in the app, run `npm test`

## Deployment

To deploy the application to Digital Ocean production, run
`git push production master` and it will deploy master to prod.

This will run a git/hooks script on the server in a bare repo called app.git that will
- set the GIT_WORK_TREE
- set the NODE_ENV to production
- checkout the repo into the public directory
- remove node_modules in the app and reinstall them
- make the logs directory and files if they don't exist
- restart the server

## Endpoints

Endpoints for the API are

- `POST /api/v1/urls` creates a shortened URL

- `GET /api/v1/urls` gets a list of all URLs that have been added to the database 

- `POST /api/v1/urls/:id` update an existing URL in the database

- `DELETE /api/v1/urls/:id` deletes a shortened URL from the database

- `GET /go/:shortURL` takes a user to the original URL link