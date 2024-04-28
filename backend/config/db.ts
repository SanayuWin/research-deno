import { Pool } from "../deps.ts";
const databaseUrl = Deno.env.get("DATABASE_URL")!;

const pool = new Pool(databaseUrl, 3, true);

const db = await pool.connect();

export default db;
