import { STATUS_CODE } from "../enums/statusCode.js";
import { loginSchema, newUserSchema } from "../schemas/auth.schema.js";




function validateNewUser(req, res, next) {
    
    const { name, email, password, confirmPassword} = req.body
    const newUser = { name, email, password, confirmPassword}
    

    const validation = newUserSchema.validate(newUser, {
        abortEarly: false,
    });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
    }

    next()
}


function validateLogin (req, res, next){
    
   
    const { email, password} = req.body
    const Login = { email, password}
    const validation = loginSchema.validate(Login, {
        abortEarly: false,
    });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
    }

    next()
}


export {validateNewUser, validateLogin}