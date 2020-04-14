import HttpErrors from 'http-errors';
import Types from 'mongoose';
import User from '../models/user.model.js';

export default class UserController {

    static async createUser(req, res){
        const userExist = await User.exists( { username: req.body.username });
        if(userExist){
            throw new HttpErrors.BadRequest();
        }
        else{
            const new_user = new User({
                username: req.body.username,
                password: req.body.password,
                createTime: new Date()
            });
            await new_user.save();
            res.json({ status: 'success' });
        }
    }

    static ensureLoggedIn(req, res, next){ 
        if(req.user){
            next();
        }else{
            throw new HttpErrors.Unauthorized();
        }
    
    }

    static whoami(req, res){
        res.json(req.user);
    }

}