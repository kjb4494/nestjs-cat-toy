import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from 'src/cats/cats.schema';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @CurrentUser() currentCat: Cat,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, currentCat, body);
  }

  @ApiOperation({ summary: '좋아요 수 늘리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
