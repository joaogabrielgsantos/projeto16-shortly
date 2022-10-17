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

        const insertLink = await connection.query(
            `INSERT INTO links (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, session.rows[0].userId]
        );
        const findLink = await connection.query(
            `SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]
        );
        
        
        const insertVisit = await connection.query(
            `INSERT INTO visits ("linkId") VALUES ($1);`, [findLink.rows[0].id]
        );

        return res.status(STATUS_CODE.OK).send(shortUrl);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}





async function getUrl(req, res) {
    const { idUrl } = req.params

    try {
        const link = await connection.query(
            `SELECT * FROM links WHERE id = $1`, [idUrl]
        );

        if (link.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        const { id, url, shortUrl } = link.rows[0]

        const format = { id, url, shortUrl }



        return res.status(STATUS_CODE.OK).send(format);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }

}

async function getShortUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const link = await connection.query(
            `SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]
        );

        if (link.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        const { id } = link.rows[0]


        const visit = await connection.query(
            `SELECT * FROM visits WHERE "linkId" = $1`, [id]
        );

        
        if (visit.rowCount === 0) {
            const insertVisit = await connection.query(
                `INSERT INTO visits ("linkId") VALUES ($1);`, [id]
            );
        } else {
            const updateVisit = await connection.query(
                `UPDATE visits SET views = $1 WHERE "linkId" = $2;`, [visit.rows[0].views + 1, id]
            )
        }

        return res.redirect(`/urls/${id}`)

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }

}



async function deleteUrl(req, res) {
    const { idUrl } = req.params;
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    if (!idUrl) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);



    try {
        const verifyUrlUser = await connection.query(
            `SELECT sessions.token, users.name, links.url FROM users
            JOIN links ON users.id = links."userId"
            JOIN sessions ON users.id = sessions."userId"
            WHERE links.id = $1;`, [`${idUrl}`]
        );
        
        if (verifyUrlUser.rowCount === 0 ){
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        if (verifyUrlUser.rows[0].token !== token ) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }
        
        

        const deleteVisit = await connection.query(
            `DELETE FROM visits WHERE "linkId" = $1`, [idUrl]
        );

        const deleteLink = await connection.query(
            `DELETE FROM links WHERE "id" = $1`, [idUrl]
        );

        return res.sendStatus(204);

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}






export { postUrl, getUrl, getShortUrl, deleteUrl }