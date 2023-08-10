import { IncomingMessage, ServerResponse } from 'http'
import {
  generateRequestId,
  REQUEST_FORWARD_FOR,
  REQUEST_ID_HEADER,
} from '../constant'
import { context } from '../context'

interface IncomingMessageWithIp extends IncomingMessage {
  ip?: string;
}

interface ContextCustom {
  requestId: string | string[];
  userIp: string | string[] | undefined;
}

/**
 * This is an express middleware that:
 * - Generate/Use request id (depending on if you already have one in the request header)
 * - Add it to the request context
 *
 * **Important:** this should be your first middleware
 */
export function addRequestId(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
) {
  let requestId = req.headers[REQUEST_ID_HEADER]
  const userIp  = (req as IncomingMessageWithIp).ip ?? req.headers[REQUEST_FORWARD_FOR]

  if (!requestId) {
    requestId = generateRequestId()
    req.headers[REQUEST_ID_HEADER] = requestId
  }

  res.setHeader(REQUEST_ID_HEADER, requestId)

  const currentContext = (context().getStore() as ContextCustom)

  if (currentContext) {
    // Append to the current context
    currentContext.requestId = requestId
    currentContext.userIp = userIp

    next()
    return
  }

  context().run({ requestId, userIp }, next)
}
