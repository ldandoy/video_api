const checkSession = (req, res, next) => {
    if (!req.session.user) {
        res.clearCookie('session');
    }
    next();
};

module.exports = checkSession