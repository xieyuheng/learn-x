import { Body, Controller, Get, Param, Post } from '@nestjs/common'

export interface CoffeeJson {
  name: string
  brand: string
}

@Controller('coffees')
export class CoffeesController {
  @Get()
  index() {
    return 'hi coffees'
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return { message: 'coffees', id }
  }

  @Post()
  create(@Body() body: CoffeeJson) {
    return body
  }
}
