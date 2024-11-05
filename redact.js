const mysql = require('mysql2');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: 'root',  
  database: 'script' 
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Успешное подключение к базе данных');
});
connection.query('SELECT Family, Name, Age FROM users WHERE ID = "ID"', (err, results, fields) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
    return;
  }
  results.forEach((user) => {
  rl.question('Введите айди пользователя ', (ID) => {
  console.log('Имя: '(user.Name));
});
 //console.log('Результаты запроса:');
 //results.forEach((user) => {
 //  console.log('ID:', user.ID);
 //  console.log('Фамилия:', user.Family);
 //  console.log('Имя:', user.Name);
 //  console.log('Возраст:', user.Age);
 //  console.log('Телефон:', user.Phone);
 //  console.log('---------------------------');
 //});
 rl.close();
connection.end(); 
});
});
