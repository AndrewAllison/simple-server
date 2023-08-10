import { MeetingCreateParams } from '../../src/app/meetings/models/meeting-create.params'
import { add } from 'date-fns'

export const basicCreateMeetingParams: MeetingCreateParams = {
  description: 'Some Description',
  startDateTime: new Date(),
  endDateTime: add(new Date(), { minutes: 30 }),
  notes: 'Some notes here',
}
