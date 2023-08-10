import { randomUUID } from 'crypto'

export const REQUEST_ID_HEADER = 'x-request-id'
export const REQUEST_FORWARD_FOR = 'x-forwarded-for'

export function generateRequestId() {
  return randomUUID()
}
