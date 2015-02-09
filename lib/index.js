"use strict";

var _maxLength = 999;

var _getContentLength = function(headers)
{
    return headers['content-length'] ? parseInt(headers['content-length']) : null;
}

var _validateMax = function(opts)
{
    var _opts = opts || {};

    _maxLength = _opts.max || _maxLength;

    var _middleware = function(request, response, next)
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

    return _middleware;
}

exports.validateMax = _validateMax;