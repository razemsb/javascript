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
  
  rl.question('Введите ID пользователя, которого хотите удалить: ', (ID) => {
    // пиздец
    connection.query('DELETE FROM users WHERE ID = ?', [ID], (err, result) => {
      if (err) {
        console.error('Ошибка удаления данных:', err);
      } else {
        console.log('Запись успешно удалена, затронуто строк:', result.affectedRows);
      }
      
      rl.close();
      connection.end();
    });
  });
});
