import jwt from "jsonwebtoken";
import config from "../../../conf/config.json";

export default class Authenticate {
    constructor() {
    }

    static authMiddleware(req, res, next) {

        // get the user token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {

            jwt.verify(token, config[process.env.NODE_ENV].app.secret, (err, decoded) => {
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