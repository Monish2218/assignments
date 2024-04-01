import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
interface Todo {
    title: string,
    description: string,
    done: boolean,
    id: number
}

export async function createTodo(userId: number, title: string, description: string) {
    const result = await client.query(`
        INSERT INTO todos (user_id, title, description) 
        VALUES ($1, $2, $3) RETURNING *;`, [userId, title, description]
    );
    const todo : Todo = {
        id: result.rows[0].id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        done: false
    };
    
    return todo;
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const result = await client.query('UPDATE todos SET done=true WHERE id=$1 RETURNING *;', [todoId]);
    const todo : Todo = {
        id: result.rows[0].id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        done: true 
    };
    
    return todo;
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const result = await client.query("SELECT * FROM todos WHERE user_id=$1 ORDER BY id", [userId]);
    return result.rows;
}