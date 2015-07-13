# express-content-length-validator

[![Build Status](https://travis-ci.org/ericmdantas/express-content-length-validator.svg?branch=master)](https://travis-ci.org/ericmdantas/express-content-length-validator)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/express-content-length-validator/badge.svg)](https://coveralls.io/r/ericmdantas/express-content-length-validator)

Make sure your application is not vulnerable to large payload attacks



# install

```$ npm install express-content-length-validator --save```



# api

Once you've gotten the content-length module:

```js

    var contentLength = require('express-content-length-validator');

```

You'll have a single function to work with: ```validateMax```.

## contentLength.validateMax(options)

```options``` is an object with three properties:

- ```max```, which defaults to 999;
- ```status```, which defaults to 400;
- ```message```, which defaults to "Invalid payload; too big.".


# usage as a middleware

```js

    var contentLength = require('express-content-length-validator');
    var app = require('express')();
    var MAX_CONTENT_LENGTH_ACCEPTED = 9999;

    app.use(contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: "stop it!"})); // max size accepted for the content-length

    // and then, when you're checking the routes

    app
        .post('/some/url/here', function(req, res)
        {
            /*all is good, the content-length is less than the expected
              so you can keep with your business logic*/
        });

    app.listen(8080);

```



# usage per endpoint

```js

    var contentLength = require('express-content-length-validator');
    var app = require('express')();
    var MAX_CONTENT_LENGTH_ACCEPTED = 9999;

    app.post('/some/url/here', contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: "send a smaller json, will ya?"}), function(req, res)
    {
        /*all is good, the content-length is less than the expected
        so you can keep with your business logic*/
    });

    app.listen(8080);
```


# It's that easy =]


# license

MIT