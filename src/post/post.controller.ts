import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { saveMediaToStorage } from 'src/utils/storage';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      saveMediaToStorage,
    ),
  )
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    const { hostname } = req;
    const photo = files.photo
      ? `http://${hostname}/media/${files?.photo[0]?.filename}`
      : undefined;
    const video = files.video
      ? `http://${hostname}/media/${files?.video[0]?.filename}`
      : undefined;
    return await this.postService.create(createPostDto, photo, video);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }
}
