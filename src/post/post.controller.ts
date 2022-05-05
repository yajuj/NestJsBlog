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
  UseGuards,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { saveMediaToStorage } from 'src/utils/storage';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithMetadata } from 'src/types/request-with-metadata';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
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
    @Req() req: RequestWithMetadata,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    try {
      const { hostname } = req;
      const { id, username } = req.user;

      const photo = files?.photo
        ? `http://${hostname}/media/${files?.photo[0]?.filename}`
        : undefined;
      const video = files?.video
        ? `http://${hostname}/media/${files?.video[0]?.filename}`
        : undefined;

      return await this.postService.create(
        createPostDto,
        id,
        username,
        photo,
        video,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.postService.findAll();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postService.findOne(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      saveMediaToStorage,
    ),
  )
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: RequestWithMetadata,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    try {
      const { hostname } = req;
      const { id: user_id } = req.user;

      const photo = files?.photo
        ? `http://${hostname}/media/${files?.photo[0]?.filename}`
        : undefined;
      const video = files?.video
        ? `http://${hostname}/media/${files?.video[0]?.filename}`
        : undefined;

      const candidate = await this.postService.findOne(id);
      if (!candidate) throw new ForbiddenException();
      if (candidate.author_id.toString() !== user_id)
        throw new ForbiddenException();

      return await this.postService.update(id, updatePostDto, photo, video);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithMetadata) {
    try {
      const { id: user_id } = req.user;

      const candidate = await this.findOne(id);
      if (!candidate) throw new ForbiddenException();
      if (candidate.author_id.toString() !== user_id)
        throw new ForbiddenException();

      return await this.postService.remove(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
