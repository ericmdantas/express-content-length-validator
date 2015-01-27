"use strict";

var _maxLength = 999;

var _getContentLength = function(headers)
{
    return headers['content-length'] ? parseInt(headers['content-length']) : null;
}

var CheckContentLength = function(opts)
{
    var _opts = opts || {};

    _maxLength = _opts.max || _maxLength;
}

CheckContentLength.validateMax = function(request, response, next)
{
    var _contentLength = _getContentLength(request.headers);

    if (_contentLength > _maxLength)
    {
        response
            .status(400)
            .end();

        return;
    }

    next();
}

module.exports = CheckContentLength;