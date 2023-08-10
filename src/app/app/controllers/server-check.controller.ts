import { Controller, Get, Request, Route, Tags } from 'tsoa'
import { ServerCheckResponse } from '../models/server-check.response'
import { Request as ExRequest } from 'express'
import Context from '../../../libraries/context'
import config from '../../../libraries/config/config'

@Route('')
@Tags('App')
export class ServerCheckController extends Controller {
  @Get('/check')
  public getAppCheck(@Request() req: ExRequest): ServerCheckResponse {
    const ctx = Context.get(req)

    return {
      version: config.get('version'),
      env: config.get('env'),
      requestId: ctx?.requestId,
    }
  }
}
