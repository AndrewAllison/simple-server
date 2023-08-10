import { createExpressApp } from './server'
import { logger } from './libraries/logger'
import { AddressInfo } from 'net'
import config from './libraries/config/config'
import { createServer } from 'http'

export function getServerHostMessage(serverResponse: AddressInfo) {
  return serverResponse.address === '::' ? '127.0.0.1' : serverResponse.address
}

export async function main() {
  const app = await createExpressApp()
  const httpServer = await createServer(app)
  return new Promise((resolve) => {
    const connection = httpServer.listen({ port: config.get('port') }, () => {
      const serverDetails = connection.address() as AddressInfo
      logger.info(
        `🚀  Server ready on http://${getServerHostMessage(serverDetails)}:${
          serverDetails.port
        }`,
      )
      return resolve(serverDetails)
    })
  })
}

main()
  .then(() =>
    logger.info(
      `Running Port:${config.get('port')} - Env:${config.get(
        'env',
      )} - Version:${config.get('version')}`,
    ),
  )
  .catch((error: object) => {
    logger.error('error loading server', error)
  })

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2')
})

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT')
})
