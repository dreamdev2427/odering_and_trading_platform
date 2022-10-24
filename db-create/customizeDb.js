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
    await Pool.execute(
        `update stos set title='${process.env.VALUES_HOSTNAME}', 
stolink='admin.${process.env.VALUES_HOSTNAME}.digishares.cloud', 
stolinkfull='https://admin.${process.env.VALUES_HOSTNAME}.digishares.cloud' where ID > 0; 
update params set stringvalue='https://admin.${process.env.VALUES_HOSTNAME}.digishares.cloud/platform/login' 
where param = 'SingleSignInLoginURL';`
    )
        .then(console.log).catch((err) => console.error(err));
}

main()
