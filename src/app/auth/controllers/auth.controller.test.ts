import { describe, expect, it } from 'vitest'
import { AuthController, SignUpParams } from './auth.controller'
import { mockDeep } from 'vitest-mock-extended'
import { Request as ExpressRequest } from 'express'
import { faker } from '@faker-js/faker'

describe('AuthController', () => {
  describe('sign-up', () => {
    it('should sign-up a user with valid details', () => {
      const controller = new AuthController()
      const mockRequest = mockDeep<ExpressRequest>()

      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      const email = faker.internet.email({ firstName, lastName })
      const password = faker.internet.password()

      const userData: SignUpParams = {
        firstName,
        lastName,
        email,
        displayName: `${firstName} ${lastName}`,
        password,
      }

      const result = controller.signUp(mockRequest, userData)

      expect(result).not.toBe(null)
    })
  })
})
