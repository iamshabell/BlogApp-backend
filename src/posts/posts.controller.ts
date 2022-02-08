import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ProfileMe } from '../auth/guards/profile.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../utils';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@ProfileMe() profileMe, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create({...createPostDto, userId: profileMe.id});
  }

  @Get()
  findAll(@Query() query: PostQueryDto) {

    
    return this.postsService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
