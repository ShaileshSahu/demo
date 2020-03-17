

const sucess = {

    createNote: {
        message: 'Note created successfully',
        statusCode: 201
    },

    updateNote: {
        message: 'Note updated successfully',
        statusCode: 200
    },

    deleteNote: {
        message: 'Note deleted sucessfully',
        statusCode: 200
    },
    sucessCommon: {
        message: 'Api successfully implemented',
        statusCode: 200
    }
}

const error = {

    internalServer: {
        message: 'Something went wrong',
        statusCode: 500
    }
}

module.exports =  {
    sucess,
    error
}