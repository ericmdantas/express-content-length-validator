# express-content-length-validator

[![Build Status](https://travis-ci.org/ericmdantas/express-content-length-validator.svg?branch=master)](https://travis-ci.org/ericmdantas/express-content-length-validator)
[![Coverage Status](https://coveralls.io/repos/ericmdantas/express-content-length-validator/badge.svg)](https://coveralls.io/r/ericmdantas/express-content-length-validator)

Make sure your application is not vulnerable to large payloads attacks

# install

```$ npm install express-content-length-validator --save```

# usage as a middleware

```javascript

    var contentLength = require('express-content-length-validator');
    var app = require('express')();
    var MAX_CONTENT_LENGTH_ACCEPTED = 9999;

    app.use(contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED})); // max size accepted for the content-length

    // and then, when you're checking the routes

    app.post('/some/url/here', function(req, res){/*all is good, the content-length is less than the expected*/});
    app.put('/some/url/here', function(req, res){/*all is good, the content-length is less than the expected*/});

    app.listen();

```



# usage per endpoint

```javascript

    var contentLength = require('express-content-length-validator');
    var app = require('express')();
    var MAX_CONTENT_LENGTH_ACCEPTED = 9999;

    app.post('/some/url/here', contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED}), function(req, res){/*all is good, the content-length is less than the expected*/});
    app.put('/some/url/here', contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED}), function(req, res){/*all is good, the content-length is less than the expected*/});

    app.listen();
```

It's that easy =]
