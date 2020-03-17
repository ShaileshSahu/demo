const responseConstant = require('../constant/constant'); 

// basically this is used for the handling the response by the user !!
const sendResponse = (res, data = null) => {
    const time = Date.now() - res.locals.startTime;
    console.log('data', data);
    if (data && data.message) {
        return res.status(data.message.statusCode).json({
            statusCode: data.message.statusCode,
            message: data.message.message,
            time,
            result: data.message.result || {}
        });
    } else {
        return res.status(responseConstant.sucess.sucessCommon.statusCode).json({
            statusCode: responseConstant.sucess.sucessCommon.statusCode,
            message: responseConstant.sucess.sucessCommon.message,
            time,
            result: {}
        });
    }

}

const handleError = (res, err = null) => {
    const time = Date.now() - res.locals.startTime;
    if (err && err.statusCode) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            time,
            result: err.result || {}
        })
    } else {
        return res.status(responseConstant.error.internalServer.statusCode).json({
            statusCode: responseConstant.error.internalServer.statusCode,
            message: responseConstant.error.internalServer.message,
            time,
            result: {}
        })
    }
}

module.exports = {
    handleError,
    sendResponse
}