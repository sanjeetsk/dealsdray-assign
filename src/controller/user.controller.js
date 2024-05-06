import UserModel from "../model/user.model.js";

export default class UserController{
    getRegister(req, res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login', {errorMessage:null})
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login', {errorMessage:null})
    }

    postLogin(req, res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
            return res.render('login', {
                errorMessage: 'Invalid Credentials'
            })
        }
        req.session.userEmail = email;
        console.log(req.session.userEmail);
        return res.render('dashboard', {userEmail:req.session.userEmail});
    }

    logout(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log("Error : ", err);
            }
            else{
                res.render('/login');
            }
        })
    }
}