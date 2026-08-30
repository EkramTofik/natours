process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Database connection successful  🎉');
});
// .catch((err) => {
//   console.log('Database connection failed  💥:');
// });
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
  console.log(`Error Name: ${err.name}`);
  console.log(`Error Message: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
