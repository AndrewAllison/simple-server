import config from '../../../libraries/config/config'
import * as OTPAuth from 'otpauth'

export class OneTimePassCodeService {
  issuer: string
  secret: string

  constructor() {
    this.issuer = config.get('issuer')
    const tokenSecret = config.get('secret')
    if (tokenSecret) {
      this.secret = tokenSecret
    } else {
      throw new Error(
        'Configuration missing. Please provide a TOKEN_SECRET variable.',
      )
    }
  }

  generateOneTimePasscode(digits = 6, period = 30) {
    const totp = new OTPAuth.TOTP({
      issuer: this.issuer,
      algorithm: 'SHA3-512',
      digits,
      period,
      secret: this.secret,
    })

    return totp.generate()
  }

  validateOneTimePasscode(token: string, digits = 6, period = 30) {
    const totp = new OTPAuth.TOTP({
      issuer: this.issuer,
      algorithm: 'SHA3-512',
      digits,
      period,
      secret: this.secret,
    })

    return totp.validate({ token, window: 1 }) === 0
  }
}
