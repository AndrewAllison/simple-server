import { Container, decorate, injectable } from 'inversify'
import { buildProviderModule } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { UserService } from '../../app/auth/services/user.service'

// Create a new container tsoa can use
const iocContainer = new Container()

decorate(injectable(), Controller) // Makes tsoa's Controller injectable
decorate(injectable(), UserService) // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())

// export according to convention
export { iocContainer }
