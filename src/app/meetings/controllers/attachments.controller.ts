import { Path, Post, Request, Route, Tags } from 'tsoa'
import express from 'express'
import multer from 'multer'
import Context from '../../../libraries/context'
import { Meeting } from '../models/meeting.model'
import { MeetingsService } from '../meetings.service'

@Tags('Meetings')
@Route('meetings')
export class AttachmentsController {
  @Post('{meetingId}/attachments')
  public async uploadFile(
    @Request() req: express.Request,
    @Path() meetingId: string,
  ): Promise<Meeting | void | null> {
    const ctx = Context.get(req)
    if (req.res === undefined) return
    const { files } = await this.handleFiles(req, req.res)
    if (files.length <= 0) return
    const filesToStore = this.filesToAttachments(files, meetingId)
    return new MeetingsService(ctx).addAttachments(meetingId, filesToStore)
  }

  private filesToAttachments(files: Express.Multer.File[], meetingId: string) {
    return files.map(
      ({
        filename,
        originalname,
        mimetype,
        path,
        size,
      }: Express.Multer.File) => ({
        id: filename,
        filename,
        originalname,
        type: mimetype,
        meetingId,
        path,
        size,
      }),
    )
  }

  private handleFiles(
    request: express.Request,
    response: express.Response,
  ): Promise<{ files: Express.Multer.File[] }> {
    const multerArray = multer({
      dest: 'uploads/',
    }).array('files')
    return new Promise((resolve, reject) => {
      multerArray(request, response, async (error) => {
        if (error) {
          reject(error)
        }
        resolve({
          files: request.files as Express.Multer.File[],
        })
      })
    })
  }
}
