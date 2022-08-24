import { Controller, Post, Get, Param, HttpCode, Body } from '@nestjs/common'
import { CreateCatDto } from './create-cat.dto'

@Controller('cats')
export class CatsController {
  @Get()
  async index() {
    return {
      message: 'This action returns all cats',
    }
  }

  @Post()
  store(@Body() createCatDto: CreateCatDto) {
    return {
      message: 'cats.store',
      createCatDto,
    }
  }

  @Get(':name')
  show(@Param('name') name: string) {
    return {
      message: 'cats.show',
      name,
    }
  }
}
