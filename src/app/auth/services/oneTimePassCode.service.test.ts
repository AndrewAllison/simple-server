import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import config from '../../../libraries/config/config'
import { OneTimePassCodeService } from './oneTimePassCode.service'

describe('OneTimePassCodeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('constructor', () => {
    it('should call the correct config sections', () => {
      const configSpy = vi.spyOn(config, 'get').mockReturnValue('abcd')

      const service = new OneTimePassCodeService()

      expect(service).not.toBe(null)
      expect(configSpy).toHaveBeenCalledTimes(2)
      expect(configSpy).toHaveBeenCalledWith('issuer')
      expect(configSpy).toHaveBeenCalledWith('secret')
    })
  })

  describe('generateOneTimePasscode', () => {
    it('should generate a valid token', function () {
      const configSpy = vi.spyOn(config, 'get').mockReturnValue('abcd')

      const service = new OneTimePassCodeService()
      const token = service.generateOneTimePasscode()

      const valid = service.validateOneTimePasscode(token)
      expect(valid).toBe(true)
      expect(configSpy).toHaveBeenCalledTimes(2)
      expect(configSpy).toHaveBeenCalledWith('issuer')
    })
  })

  describe('validate', () => {
    it('should return true for a valid token', function () {
      vi.spyOn(config, 'get').mockReturnValue('abcd')

      const service = new OneTimePassCodeService()
      const token = service.generateOneTimePasscode()

      const valid = service.validateOneTimePasscode(token)
      expect(valid).toBe(true)
    })

    it('should return false for an invalid token', function () {
      vi.spyOn(config, 'get').mockReturnValue('abcd')

      const service = new OneTimePassCodeService()

      const valid = service.validateOneTimePasscode('ImnotValid123456')
      expect(valid).toBe(false)
    })

    it('should return false for an expired token', async function () {
      vi.spyOn(config, 'get').mockReturnValue('abcd')

      const service = new OneTimePassCodeService()
      const token = service.generateOneTimePasscode()

      await vi.advanceTimersByTime(300000)

      const valid = service.validateOneTimePasscode(token)
      expect(valid).toBe(false)
    })
  })
})