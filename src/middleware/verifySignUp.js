import User from '../models/user.js';

export const verifySignUp = async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email })

    if(user) return res.status(409).json({ message: "el correo ya existe "});

    next();
}   