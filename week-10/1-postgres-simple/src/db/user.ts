import { client } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const  query = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3);`;
    await client.query(query, [username, password, name]);
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
interface User {
    username: string,
    password: string,
    name: string,
    id: number
}

export async function getUser(userId: number) {
    const res = await client.query('SELECT * FROM users WHERE id=$1;', [userId]);
    const user : User = {
        id: userId,
        username: res.rows[0].username,
        password: res.rows[0].password,
        name: res.rows[0].name
    };

    return user;
}
