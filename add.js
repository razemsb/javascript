const mysql = require('mysql2');
const readline = require('readline');

// интерфейс
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// database epta
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'script'
});

// connect to database epta, zhaba mydak ksta
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Успешное подключение к базе данных');

rl.question('Введите свою фамилию: ', (Family) => {

rl.question('Введите ваше имя: ', (Name) => {

rl.question('Введите ваш возраст: ', (Age) => {

// преобразование в число на всякий
  Age = parseInt(Age); 

rl.question('Введите ваш телефон: ', (Phone) => {
          // вставка данных (прям как в мать жабы)
      connection.query('INSERT INTO users (Family, Name, Age, Phone) VALUES (?, ?, ?, ?)', [Family, Name, Age, Phone], (err, result) => {
            if (err) {
              console.error('Ошибка добавления данных:', err);
            } else {
              console.log('Запись успешно добавлена, ID вставленной записи:', result.insertId);
            }
            
            // продолжения не будет
            rl.close();
            connection.end();
          });
        });
      });
    });
  });
});
