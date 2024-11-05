const mysql = require('mysql2');

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

connection.query('SELECT * FROM users', (err, results, fields) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
    return;
  }

  console.log('Результаты запроса:');
  results.forEach((user) => {
    console.log('ID:', user.ID);
    console.log('Фамилия:', user.Family);
    console.log('Имя:', user.Name);
    console.log('Возраст:', user.Age);
    console.log('Телефон:', user.Phone);
    console.log('---------------------------');
  });
});

connection.end(); 
