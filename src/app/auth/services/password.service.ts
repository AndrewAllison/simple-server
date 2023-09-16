import argon2 from 'argon2'

export class PasswordService {
  constructor() {}

  async encryptPassword(password: string): Promise<string> {
    return await argon2.hash(password)
  }

  async validatePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password)
  }
}
