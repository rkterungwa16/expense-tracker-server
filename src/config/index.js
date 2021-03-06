import Dotenv from 'dotenv'

Dotenv.config({ silent: true })

const env = process.env.NODE_ENV

const development = {
  server: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },
  tokenSecret: process.env.SECRET_KEY,
  database: {
    mongodb: {
      url: 'mongodb://localhost/db',
      host: process.env.DEV_DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT) || 27017,
      name: process.env.DEV_DB_NAME || 'db'
    },
    postgres: {},
    sqlite: {}
  },
  nodemailer: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'terungwakombol@gmail.com',
      pass: process.env.SMTP_PASSWORD
    }
  }
}
const test = {
  server: {
    port: parseInt(process.env.TEST_APP_PORT) || 3000
  },
  database: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 27017,
    name: process.env.TEST_DB_NAME || 'test'
  },
  logger: {},
  google: {},
  facebook: {}
}

/**
 * Class to determine environment in use
 * assign appropriate config
 */
class ConfigSettings {
  /**
   *
   * @param {*} currentEnv
   * @return {Object} configuration object
   */
  getConfig (currentEnv) {
    if (currentEnv === 'development') {
      return development
    } if (currentEnv === 'test') {
      return test
    }
    throw new Error('There is no configuration for this environment')
  }
}

const configSettings = new ConfigSettings()

export const config = configSettings.getConfig(env)
