import dotenv from 'dotenv'
import convict from 'convict'
import packageJson from '../../../package.json'

dotenv.config()

const config = convict({
  env: {
    default: 'local',
    env: 'NODE_ENV',
  },
  version: {
    doc: 'Version',
    format: 'String',
    default: packageJson.version,
  },
  port: {
    doc: 'HTTP port number where the server can be reached',
    format: Number,
    default: 6001,
    env: 'PORT',
    arg: 'port',
  },
  logLevel: {
    doc: 'Logging Level',
    format: ['trace', 'debug', 'info', 'warn', 'error'],
    default: 'info',
    env: 'LOG_LEVEL',
  },
  issuer: {
    doc: 'Token issuer',
    format: 'String',
    default: 'API-Issuer',
    env: 'TOKEN_ISSUER',
    arg: 'issuer',
  },
  secret: {
    doc: 'Token secret',
    format: 'String',
    default: null,
    env: 'TOKEN_SECRET',
    arg: 'secret',
  },
})

export default config
