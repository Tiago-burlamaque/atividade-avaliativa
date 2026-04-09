import mysql2 from 'mysql2/promise'

const db = mysql2.createPool({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "senai",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "atividade_avaliativa"
})

export default db;