import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

const user = 'postgres';
const password = 'gangorra';
const host = 'localhost';
const port = 5432;
const database = 'shortly';

const connection = new Pool({
    user,
    password,
    host,
    port,
    database
});


export default connection