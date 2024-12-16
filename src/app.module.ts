import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModuleOptions } from './configs/config.module.options';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FirebaseAdmin } from './configs/firebase.setup';

@Module({
  imports: [ConfigModule.forRoot(ConfigModuleOptions()), UserModule],
  controllers: [AppController],
  providers: [AppService, FirebaseAdmin],
})
export class AppModule { }
