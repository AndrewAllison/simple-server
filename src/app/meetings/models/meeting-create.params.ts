export interface MeetingCreateParams {
  description: string
  notes: string
  startDateTime: Date | null
  endDateTime: Date | null
}
