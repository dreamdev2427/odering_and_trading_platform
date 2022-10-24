const mysql = require('mysql2/promise');

async function main() {
    const Pool = mysql.createPool({
        host: process.env.DB_SERVER,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
        decimalNumbers: true,
    });
    console.log(process.env.DB_SERVER)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_DATABASE)
    console.log(process.env.DB_PASSWORD)
    await Pool.execute('SELECT * FROM stos where ID=0').then(console.log).catch((err) => console.error(err));
    await Pool.destroy();
    console.log('single connection')
    const connection = mysql.createConnection({
        host: process.env.DB_SERVER,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });

// simple query
    await connection.query(
        'SELECT * FROM `sharetypes`'
    ).then(console.log).catch((err) => console.error(err));
    throw ''
}

main()
