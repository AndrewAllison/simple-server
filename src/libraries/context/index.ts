import { Request } from 'express'
import { generateRequestId } from '../request-id/constant'
import { prisma } from '../db/prisma-client'

export default class Context {
  static _bindings = new WeakMap<Request, Context>()

  public requestId = generateRequestId()

  public prisma = prisma

  constructor() {}

  static bind(req: Request): void {
    const ctx = new Context()
    Context._bindings.set(req, ctx)
  }

  static get(req: Request): Context {
    const ctx = Context._bindings.get(req)
    if (!ctx) throw new Error('Context unavailable')
    return ctx
  }
}
