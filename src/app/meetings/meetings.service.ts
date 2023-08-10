import { Meeting } from '@prisma/client'
import Context from '../../libraries/context'
import { Attachment } from './models/meeting.model'
import { MeetingCreateParams } from './models/meeting-create.params'

export class MeetingsService {
  constructor(private readonly context: Context) {}

  public async getAll(): Promise<Meeting[]> {
    const prisma = this.context.prisma
    return prisma.meeting.findMany({})
  }

  public async get(meetingId: string): Promise<Meeting | null> {
    const prisma = this.context.prisma
    return prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        attachments: true,
      },
    })
  }

  public async delete(meetingId: string): Promise<boolean> {
    try {
      const prisma = this.context.prisma
      await prisma.meeting.delete({
        where: {
          id: meetingId,
        },
      })
      return true
    } catch (e) {
      return false
    }
  }

  public async createMeeting(meetingDetails: MeetingCreateParams) {
    const prisma = this.context.prisma
    return prisma.meeting.create({
      data: meetingDetails,
    })
  }

  public async addAttachments(
    meetingId: string,
    files: Attachment[],
  ): Promise<Meeting | null> {
    const prisma = this.context.prisma

    await prisma.attachment.createMany({
      data: files,
    })

    return prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        attachments: true,
      },
    })
  }
}
