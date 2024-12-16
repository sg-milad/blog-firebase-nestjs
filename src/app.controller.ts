import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from './common/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('/admin')
  @Auth('ADMIN')
  @ApiOperation({ description: "only admin" })
  onlyAdmin() {
    return 'hi admin';
  }

  @Get('/dev')
  @Auth('DEVELOPER')
  @ApiOperation({ description: "only developer" })
  onlyDeveloper() {
    return 'hi devs do you need coffee?';
  }

  @Get('/public')
  public() {
    return 'hi to society';
  }
}
