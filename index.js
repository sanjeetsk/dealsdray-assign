import express from "express";
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from "express-session";
import UserController from "./src/controller/user.controller";

const server = express();

//parse form data
server.use(express.urlencoded({extended: true}));

server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

server.use(ejsLayouts);

//setup view engine setting
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

//create an instance of UserController
const userController = new UserController();

// 

server.get('/', (req, res) => {
    res.render('landingPage');
})
server.get('/register', userController.getRegister);
server.get('/login', userController.getLogin);
server.post('/register', userController.postRegister);
server.post('/login', userController.postLogin);

server.get('/logout', userController.logout);


server.use(express.static('./src/views'))
server.use(express.static('public'));

server.listen(3100,()=>{
    console.log("Server is running on port 3100");
});