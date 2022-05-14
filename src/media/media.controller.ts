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
import { saveMediaToStorage } from 'src/utils/storage';

@Controller('media')
export class MediaController {
  @Post()
  @UseInterceptors(FileInterceptor('file', saveMediaToStorage))
  create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    try {
      const { hostname } = req;
      console.log(file);

      const media = file
        ? `http://${hostname}/media/${file.filename}`
        : undefined;
      if (!media) throw new BadRequestException();

      return { media };
    } catch (error) {}
  }

  @Get(':mediaId')
  find(@Param('mediaId') mediaId: string, @Res() res: Response) {
    try {
      return res.sendFile(mediaId, {
        root: 'media',
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
