import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModuleOptions } from './configs/config.module.options';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(ConfigModuleOptions()),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
