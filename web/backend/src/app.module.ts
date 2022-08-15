import { Module } from '@nestjs/common';
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';
import { ArticlesResolver } from './article/presentation/resolver/article.resolver';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      formatError: (error: GraphQLError) => {
        // GraphQLのレスポンスはstacktraceを含んでしまうのでここで除去する
        if (error.extensions?.exception?.stacktrace) {
          delete error.extensions.exception.stacktrace
        }
        return error
      },
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService, PrismaService, ArticlesResolver],
})
export class AppModule {}
