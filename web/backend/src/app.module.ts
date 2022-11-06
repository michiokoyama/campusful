import { Module } from '@nestjs/common'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { ArticlesResolver } from './article/presentation/resolver/article.resolver'
import { UserResolver } from './user/presentation/resolver/user.resolver'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'
import { CommentModule } from './comment/comment.module'
import { CommentResolver } from './comment/presentation/resolver/comment.resolver'
import { UploadModule } from './upload/upload.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller'
import { UserService } from './user/user.service'
import { ArticleService } from './article/article.service'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cors: {
        origin: '*',
        credentials: false,
      },
      formatError: (error: GraphQLError) => {
        // GraphQLのレスポンスはstacktraceを含んでしまうのでここで除去する
        if (error.extensions?.exception?.stacktrace) {
          delete error.extensions.exception.stacktrace
        }
        return error
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    ArticleModule,
    CommentModule,
    UserModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    ArticleService,
    ArticlesResolver,
    UserResolver,
    CommentResolver,
    AuthService,
  ],
})
export class AppModule {}
