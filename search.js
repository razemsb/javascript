const mysql = require('mysql2');
const readline = require('readline');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: 'root',  
  database: 'script' 
});

// интерфейс
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// подключение к бд
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Успешное подключение к базе данных');
  
  rl.question('Введите фамилию пользователя: ', (Family) => {
    // пиздец
    connection.query('SELECT * FROM users WHERE Family = ?', [Family], (err, result) => {
      
        result.forEach((user) => {
            console.log('ID:', user.ID);
            console.log('Фамилия:', user.Family);
            console.log('Имя:', user.Name);
            console.log('Возраст:', user.Age);
            console.log('Телефон:', user.Phone);
            console.log('---------------------------');
      rl.close();
      connection.end();
    });
  });
});
});