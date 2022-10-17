import connection from "../db/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";


async function getUserUrls(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);


    try {

        const verifyUser = await connection.query(
            `SELECT sessions.token, users.name, links.url FROM users
            JOIN links ON users.id = links."userId"
            JOIN sessions ON users.id = sessions."userId"
            WHERE sessions.token = $1;`, [`${token}`]
        );
        if (verifyUser.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }
        if (verifyUser.rows[0].token !== token) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }


        const verifyUrlUser = await connection.query(
            `SELECT users.id, users.name, SUM(views) AS "visitCount"
            FROM users
            JOIN links ON users.id = links."userId"
            JOIN sessions ON users.id = sessions."userId"
            JOIN visits ON links.id = visits."linkId"
            WHERE sessions.token = $1
            GROUP BY users.id;`, [`${token}`]
        );
        const { id, name, visitCount } = verifyUrlUser.rows[0]

        const getShortenedUrls = await connection.query(
            `SELECT links.id, links."shortUrl", links.url , views AS "visitCount"
            FROM links
            JOIN visits ON links.id = visits."linkId"
            WHERE links."userId" = $1;`, [id]
        );

        const format = { id, name, visitCount, shortenedUrls: getShortenedUrls.rows }

        return res.status(STATUS_CODE.OK).send(format);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}



async function getRanking(req, res) {

    try {

        const ranking = await connection.query(
            `SELECT users.id, users.name, COUNT(links) AS "linksCount", SUM(views) AS "visitCount"
            FROM users
            left JOIN links ON links."userId" = users.id
            left JOIN visits ON links.id = visits."linkId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC LIMIT 10
            ;
            `
            
        );

        return res.status(STATUS_CODE.OK).send(ranking.rows);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}


export { getUserUrls, getRanking }