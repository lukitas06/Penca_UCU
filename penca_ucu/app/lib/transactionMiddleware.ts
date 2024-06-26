import { pool } from './dbConnection';

export async function withTransaction(handler: (conn: any) => Promise<any>) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const result = await handler(conn);
        await conn.commit();
        return result;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}
