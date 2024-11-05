const mysql = require('mysql2');
const readline = require('readline');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'script'
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
connection.query('SELECT Name, Age FROM users', (err, results, fields) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      return;
}
  console.log('Результаты запроса:');
  results.forEach((user) => {
  console.log('Имя:', user.Name);
  if(user.Age >= 18) {
        console.log("Совершеннолетний")
  }else {
        console.log("Не совершеннолетний")
  }
  console.log('---------------------------');
});
});
    rl.close();
    connection.end();