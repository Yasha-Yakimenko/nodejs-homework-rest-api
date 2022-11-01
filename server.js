const app = require('./app')

 // Запуск сервера
 app.listen(3000, () => {
   console.log("Server running. Use our API on port: 3000")
 })

const mongoose = require('mongoose');

const {DB_HOST, PORT = 3000} = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log("Database connection successful")
  }))
  .catch(error =>
    {console.log(error);
    process.exit(1);
  });