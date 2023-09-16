import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import Context from '../src/libraries/context'

beforeEach(() => {
  mockReset(context)
})

const context = mockDeep<Context>()
export default context
