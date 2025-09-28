import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    HttpModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestjs-mongo-db'),
    ProductsModule,
    AuthModule,
    UsersModule,
    GithubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
