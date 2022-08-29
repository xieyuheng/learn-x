import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<CoffeeJson>) {
    return `update ${id}`
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return `destroy ${id}`
  }
}
