import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql'
import { AppsModule } from './apps/apps.module';
import * as GraphQLJSON from 'graphql-type-json';
import { ObjectIdScalar } from './scalars/object-id.scalar';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot({ 
      autoSchemaFile: 'schema.gql', 
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    AppsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
