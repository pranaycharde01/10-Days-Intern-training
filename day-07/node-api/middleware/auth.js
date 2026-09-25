function auth(req, res, next) {
    const authorization = req.headers.authorization;

    // Check whether authorization header exists
    if (!authorization) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    // Demo authentication token
    const validToken = "Bearer day7-token";

    if (authorization !== validToken) {
        return res.status(401).json({
            message: "Invalid authentication token"
        });
    }

    next();
}

module.exports = auth;
