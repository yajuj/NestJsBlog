import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { saveMediaToStorage } from 'src/utils/storage';

@Controller('media')
export class MediaController {
  @Post()
  @UseInterceptors(FileInterceptor('file', saveMediaToStorage))
  create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const { hostname } = req;
    const media = file
      ? `http://${hostname}/media/${file.filename}`
      : undefined;
    if (!media) throw new BadRequestException();

    return { media };
  }

  @Get(':mediaId')
  find(@Param('mediaId') mediaId: string, @Res() res: Response) {
    return createReadStream(join(process.cwd(), `media/${mediaId}`)).pipe(res);
  }
}
