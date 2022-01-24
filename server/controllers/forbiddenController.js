const forbiddenGet = (req, res, next) => {
    res.status(403).json({
        status: 'fail',
        message: 'Get operation not allowed on this route'
    })

}
const forbiddenPost = (req, res, next) => {
    res.status(403).json({
        status: 'fail',
        message: 'Post operation not allowed on this route'
    })

}
const forbiddenPut = (req, res, next) => {
    res.status(403).json({
        status: 'fail',
        message: 'Put operation not allowed on this route'
    })

}
const forbiddenDelete = (req, res, next) => {
    res.status(403).json({
        status: 'fail',
        message: 'Delete operation not allowed on this route'
    })

}

module.exports = {
    forbiddenGet,
    forbiddenPost,
    forbiddenPut,
    forbiddenDelete
}