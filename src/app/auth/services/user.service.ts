import { PrismaClient } from '@prisma/client'
import { prisma } from '../../../libraries/db/prisma-client'
import { SignUpParams } from '../controllers/auth.controller'

export class UserService {
  prismaClient: PrismaClient
  constructor() {
    this.prismaClient = prisma
  }

  getUserByEmail(email: string) {
    return this.prismaClient.user.findUnique({
      where: {
        email,
      },
    })
  }

  async createUser(loginParams: SignUpParams) {
    const { email, firstName, lastName, displayName, password } = loginParams

    if (!password) {
      throw new Error('No Password provided.')
    }

    const newUser = await this.prismaClient.user.create({
      data: {
        email,
        firstName,
        lastName,
        displayName: displayName ? displayName : `${firstName} ${lastName}`,
      },
    })

    return { ...newUser }
  }
}
