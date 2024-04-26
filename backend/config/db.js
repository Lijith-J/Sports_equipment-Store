import mysql from 'mysql2'

export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'129109208',
    database:'sports'
})

export default db