import { Controller, Get } from '@nestjs/common'

@Controller('coffees')
export class CoffeesController {
  @Get()
  index() {
    return {message:'coffees'}
  }
}
