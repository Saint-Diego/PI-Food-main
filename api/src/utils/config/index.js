require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'diego89',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbName: process.env.DB_NAME || 'food',
  apiKey: process.env.API_KEY || 'de96b512a37d48bc8e47272a56c77b24',
}