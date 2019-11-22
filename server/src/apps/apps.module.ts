import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { AppsResolver } from './apps.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSchema } from '../schemas/app.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'App', schema: AppSchema}])],
  controllers: [AppsController],
  providers: [AppsService, AppsResolver]
})
export class AppsModule {}
