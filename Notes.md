https://youtu.be/6K8mW0k7sfw


in the guided demo in the knexfile we have both testing and development.both are pointing to different databases its because in testing we need to wipe and manipulate the data as needed, where as in development we want to preserve the data... so needs to be separate 


in package .json.... "test":"cross-env DB-env=testing jest--watch--verbose"
so that testing should connect to the correct database
knex>knex init>automatically knexfile
kinex migrate:make createProjectTable,
knex migrate:latest
knex seed:make 01-project
knex seed :run


MOST IMP
when we are running jest with node in package.json we must have
"jest": {
		"testEnvironment": "node"
	},
    now, jest will not look into the window object.settimeout is node not window.

    we need to have a serverspec.js file to test

    DIFFERENCE BETWEEN TOBE AND TOEQUAL is that toBe works with all primitive data types only int, string not with array and objects for array and objects we need to use toEqual for testing.to Equal  checks just key , value pair

    we need library supertest 
    and need to use it.
    yarn add supertest
    const request=('supertest')


    we cant have server listening in the same file where we are exporting server stuff,because the server says its already listening on that very port. listening should happen in a separate file.supertest also requires  

    HOW COME KNEX KNOWS WHICH DATABASE TO CONNECT:
    knex migrate:latest --env=testing
    or 
    NODE_ENV=testing knex seed:run
