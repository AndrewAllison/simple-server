export interface Meeting {
  id: string
  description: string
  notes: string
  startDateTime: Date | null
  endDateTime: Date | null

  attachments?: Attachment[]

  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  originalname: string
  filename: string
  type: string
  size: number
  path: string
  meetingId: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
