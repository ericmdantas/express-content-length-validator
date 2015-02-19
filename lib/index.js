"use strict";

var _contentLength =
{
    DEFAULT_MAX_LENGTH: 999,
    DEFAULT_ERROR_STATUS: 400,
    DEFAULT_ERROR_MESSAGE: "Invalid payload; too big."
};

var _validateMax = function(opts)
{
    var _opts = opts || {};

    var _maxLength = _opts.max || _contentLength.DEFAULT_MAX_LENGTH;
    var _status = _opts.status || _contentLength.DEFAULT_ERROR_STATUS;
    var _message = _opts.message || _contentLength.DEFAULT_ERROR_MESSAGE;

    var _middleware = function(request, response, next)
    {
        var _contentLength = request.headers['content-length'] ? parseInt(request.headers['content-length']) : null;

        if (_contentLength > _maxLength)
        {
            response.status(_status).json({message: _message});

            return;
        }

        next();
    }

    return _middleware;
}

exports.validateMax = _validateMax;