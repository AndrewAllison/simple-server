import {
  Body,
  Controller,
  Post,
  Request,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { Request as ExpressRequest } from 'express'
import { UserService } from '../services/user.service'

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export interface SignUpParams {
  firstName: string
  lastName: string
  displayName?: string | undefined
  email: string

  password: string
}

@Tags('Auth')
@Route('auth')
export class AuthController extends Controller {
  constructor() {
    super()
  }

  @Post('/sign-up')
  @SuccessResponse('200', 'Success')
  public async signUp(
    @Request() req: ExpressRequest,
    @Body() loginParams: SignUpParams,
  ) {
    console.log(loginParams)
    const userService = new UserService()
    // Check the user is not already in the db
    const existingUser = await userService.getUserByEmail(loginParams.email)
    console.log(existingUser)
    if (existingUser) {
      throw new AuthError('An issue occurred creating that user')
    }

    const user = await userService.createUser(loginParams)

    return { user }
  }
}
