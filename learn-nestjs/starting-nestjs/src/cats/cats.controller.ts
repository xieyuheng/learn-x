import { Controller, Get, Param, HttpCode } from '@nestjs/common'

@Controller('cats')
export class CatsController {
  @Get()
  index() {
    return {
      message: 'This action returns all cats',
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
