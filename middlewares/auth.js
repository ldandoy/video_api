const chekAuth = (req, res, next) => {
    if(req.session.user && req.cookies.session) {
        res.clearCookie('session')
    }
    next()
};

module.exports = chekAuth;