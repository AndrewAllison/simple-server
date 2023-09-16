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
import Context from '../../../libraries/context'
import { LoginParams } from '../models/login.params'
import { PasswordService } from '../services/password.service'

@Tags('Auth')
@Route('auth')
export class AuthController extends Controller {
  @Post('/login')
  @SuccessResponse('200', 'Success')
  public async createMeeting(
    @Request() req: ExpressRequest,
    @Body() loginParams: LoginParams,
  ) {
    const ctx = Context.get(req)
    return new PasswordService(ctx).validateUser(loginParams)
  }
}
