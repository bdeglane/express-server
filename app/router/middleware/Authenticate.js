import jwt from "jsonwebtoken";

export default class Authenticate {
    constructor(app) {
        this.app = app;
    }

    static authMiddleware(req, res, next) {

        // get the user token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {

            jwt.verify(token, this.app.get('secret'), (err, decoded) => {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'no token'
            });
        }
    }
}