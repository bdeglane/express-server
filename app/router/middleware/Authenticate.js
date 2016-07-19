import jwt from "jsonwebtoken";
import config from "../../../conf/config.json";

export default class Authenticate {

    static authMiddleware(req, res, next) {
        // get the user token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        // if the token exist in header
        if (token) {
            // verify if it's a valid token
            jwt.verify(token, config[process.env.NODE_ENV].app.token.secret, (err, decoded) => {
                // if the token is incorrect
                if (err) {
                    // return an error
                    return res.status(401).json(new View({
                        success: false,
                        message: 'Failed to authenticate token.'
                    }, 401));
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).json(new View({
                success: false,
                message: 'no token'
            }, 401));
        }
    }

    /**
     *
     * @param user {{}}
     */
    getToken(user) {
        return jwt.sign(user, config[process.env.NODE_ENV].app.token.secret, {
            expiresIn: config[process.env.NODE_ENV].app.token.expire
        });
    }
}