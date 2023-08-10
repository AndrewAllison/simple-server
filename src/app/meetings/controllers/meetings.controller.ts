import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { Request as ExpressRequest } from 'express'
import { Meeting } from '../models/meeting.model'
import { MeetingsService } from '../meetings.service'
import Context from '../../../libraries/context'
import { MeetingsResponse } from '../models/meetings.response'
import { MeetingCreateParams } from '../models/meeting-create.params'

@Tags('Meetings')
@Route('meetings')
export class UsersController extends Controller {
  /**
   * Retrieves a list of all the meetings.
   * Supply the unique meeting ID and receive corresponding meeting details.
   * @param req The request details
   */
  @Get('')
  public async getAllMeetings(
    @Request() req: ExpressRequest,
  ): Promise<MeetingsResponse> {
    const ctx = Context.get(req)
    const meetings = await new MeetingsService(ctx).getAll()
    return {
      items: meetings,
    }
  }

  /**
   * Creates a new meeting entry in the database.
   * Supply the relevant details to create the meeting details.
   * @param {MeetingCreateParams} meetingDetails Details with which the meeting is created
   * @param req The request details
   */
  @Post('')
  @SuccessResponse('201', 'Created')
  public async createMeeting(
    @Request() req: ExpressRequest,
    @Body() meetingDetails: MeetingCreateParams,
  ) {
    const ctx = Context.get(req)
    return new MeetingsService(ctx).createMeeting(meetingDetails)
  }

  /**
   * Retrieves the details of an existing meeting.
   * Supply the unique meeting ID and receive corresponding meeting details.
   * @param meetingId The meetings identifier
   * @param req The request details
   */
  @Get('{meetingId}')
  public async getMeeting(
    @Request() req: ExpressRequest,
    @Path() meetingId: string,
  ): Promise<Meeting | null> {
    const ctx = Context.get(req)
    return new MeetingsService(ctx).get(meetingId)
  }

  /**
   * Removes the meeting from the data store.
   * Supply the unique meeting ID and remove corresponding meeting details.
   * @param meetingId The meetings identifier
   * @param req The request details
   */
  @Delete('{meetingId}')
  @SuccessResponse('204', 'Deleted')
  public async deleteMeeting(
    @Request() req: ExpressRequest,
    @Path() meetingId: string,
  ) {
    const ctx = Context.get(req)
    const meetingDeleted = await new MeetingsService(ctx).delete(meetingId)
    if (meetingDeleted) {
      this.setStatus(204)
      return
    } else {
      this.setStatus(410)
    }
  }
}
