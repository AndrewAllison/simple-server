import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PasswordService } from './password.service'
import config from '../../../libraries/config/config'

describe('OneTimePassCodeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.spyOn(config, 'get').mockReturnValue('&^*(iuhjilkm')
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('constructor', () => {
    it('should call the correct config sections', () => {
      const service = new PasswordService()

      expect(service).not.toBe(null)
    })
  })

  describe('encryptPassword', () => {
    it('should generate a valid token', async function () {
      const userData = '1234retfg%$TRG'

      const service = new PasswordService()
      const token = await service.encryptPassword(userData)

      expect(token).not.toEqual(userData)
    })
  })

  describe('validatePassword', () => {
    it('should return true with a valid password', async () => {
      const userData = 'P%^&8huin'
      const service = new PasswordService()
      const hashedPassword = await service.encryptPassword(userData)

      const result = await service.validatePassword(hashedPassword, userData)

      expect(result).toEqual(true)
    })

    it('should return false with an invalid password', async () => {
      const userData = 'P%^&8huin'
      const service = new PasswordService()
      const hashedPassword = await service.encryptPassword(userData)

      const result = await service.validatePassword(
        hashedPassword,
        'Not my password',
      )

      expect(result).toEqual(false)
    })
  })
})
