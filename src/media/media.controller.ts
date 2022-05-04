import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { saveMediaToStorage } from 'src/utils/storage';

@Controller('media')
export class MediaController {
  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'photo', maxCount: 1 },
  //       { name: 'video', maxCount: 1 },
  //     ],
  //     saveMediaToStorage,
  //   ),
  // )
  // create(
  //   @Req() req: Request,
  //   @UploadedFiles()
  //   files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  // ) {
  //   const { hostname } = req;
  //   const photo = files.photo
  //     ? `http://${hostname}/media/${files?.photo[0]?.filename}`
  //     : undefined;
  //   const video = files.video
  //     ? `http://${hostname}/media/${files?.video[0]?.filename}`
  //     : undefined;

  //   return { photo, video: video ? video : '' };
  // }

  @Get(':mediaId')
  find(@Param('mediaId') mediaId: string, @Res() res: Response) {
    return createReadStream(join(process.cwd(), `media/${mediaId}`)).pipe(res);
  }
}
