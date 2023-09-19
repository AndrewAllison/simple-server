import geoip from 'geoip-lite'

export class IpLookUpService {
  getGeoLocation(ipAddress: string) {
    return geoip.lookup(ipAddress)
  }
}
