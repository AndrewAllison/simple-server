import { describe, expect, it } from 'vitest'
import { IpLookUpService } from './ipLookUp.service'

describe('ipLookUpService', () => {
  it('should do a look up', async () => {
    const service = new IpLookUpService()
    const results = await service.getGeoLocation('81.147.4.151')
    expect(results).not.toBeNull()
  })
})
