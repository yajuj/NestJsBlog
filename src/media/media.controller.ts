import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('media')
export class MediaController {
  @Get(':mediaId')
  find(@Param('mediaId') mediaId: string, @Res() res: Response) {
    return createReadStream(join(process.cwd(), `media/${mediaId}`)).pipe(res);
  }
}
