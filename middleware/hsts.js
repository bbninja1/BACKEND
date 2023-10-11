function hsts(req, res, next) {
    if (req.secure) {
        res.setHeader('Strict-Transport-Security', 'max-age=0; includesubDomains; preload');
    }
    next();
}

module.exports = hsts;