import argon2 from 'argon2'
import config from '../../../libraries/config/config'

export class PasswordService {
  secret: string
  constructor() {
    const configString = config.get('secret')
    if (!configString) {
      throw new Error('No secret value provided')
    }
    this.secret = configString
  }

  async encryptPassword(password: string): Promise<string> {
    return await argon2.hash(password, {
      secret: Buffer.from(this.secret),
    })
  }

  async validatePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password, {
      secret: Buffer.from(this.secret),
    })
  }
}
