import { MeetingsService } from '../../../src/app/meetings/meetings.service'
import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import prisma from '../../../__mocks__/prisma'
import { basicCreateMeetingParams } from '../../../__mocks__/data/meeting-data.stubs'

// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
describe('MeetingService', () => {
  describe('createMeeting', () => {
    it('should create a new meeting calling the prisma client', async () => {
      prisma.meeting.create.mockResolvedValue({
        ...basicCreateMeetingParams,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await new MeetingsService({
        prisma: prisma,
        requestId: randomUUID(),
      }).createMeeting(basicCreateMeetingParams)

      expect(prisma.meeting.create).toHaveBeenCalled()
    })
    it('should create a new meeting and return it with a generated id', async () => {
      prisma.meeting.create.mockResolvedValue({
        ...basicCreateMeetingParams,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await new MeetingsService({
        prisma: prisma,
        requestId: randomUUID(),
      }).createMeeting(basicCreateMeetingParams)

      expect(prisma.meeting.create).toHaveBeenCalled()
      expect(result).not.toBeNull()
      expect(result.id).toEqual('123')
    })
  })
})
