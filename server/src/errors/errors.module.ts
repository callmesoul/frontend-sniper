import { Module } from '@nestjs/common';
import { ErrorsController } from './errors.controller';
import { ErrorsService } from './errors.service';
import { ErrorsResolver } from './errors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorSchema } from '../schemas/error.schema';
import { AppSchema } from '../schemas/app.schema';
import { ErrorRecordSchema } from '../schemas/error.record.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Error', schema: ErrorSchema},
    {name: 'App', schema: AppSchema},
    {name: 'ErrorRecord', schema: ErrorRecordSchema},
  ])
  ],
  controllers: [ErrorsController],
  providers: [ErrorsService, ErrorsResolver]
})
export class ErrorsModule {}
