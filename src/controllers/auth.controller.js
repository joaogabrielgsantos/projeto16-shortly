import connection from "../db/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


async function signUp(req, res) {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    const encrypetPassword = bcrypt.hashSync(password, 11);

    try {

        const insertNewUser = await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encrypetPassword]
        );
        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        console.error(error);
        if (error.detail == `Key (email)=(jggsantos.25@gmail.com) already exists.`){
            return res.status(STATUS_CODE.CONFLICT).send(error.detail);
        }
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.detail);
    }
}


async function signIn(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    try {

        const user = await connection.query(
            `SELECT * FROM users WHERE email = $1`, [email]
        );

        const isValidPass = bcrypt.compareSync(password, user.rows[0].password);
    

    if (user.rowCount === 0 || !isValidPass){
        return res.status(STATUS_CODE.UNAUTHORIZED).send(error.message);
    }

    const token = uuid();
    await connection.query(
        `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, user.rows[0].id]
    );

    return res.status(STATUS_CODE.OK).send({token: token});

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}



export {signUp, signIn}