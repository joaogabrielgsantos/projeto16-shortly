import connection from "../db/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { nanoid } from 'nanoid'




async function postUrl(req, res) {
    const { url } = req.body;
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    if (!url) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    const shortUrl = nanoid(10)


    try {
        const session = await connection.query(
            `SELECT * FROM sessions WHERE token = $1`, [token]
        );


        if (session.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        await connection.query(
            `INSERT INTO links (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, session.rows[0].userId]
        );

        return res.status(STATUS_CODE.OK).send(shortUrl);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}





async function getUrl (){

}


export { postUrl, getUrl }