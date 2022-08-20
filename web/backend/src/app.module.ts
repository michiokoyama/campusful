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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cors: {
        origin: 'http://localhost:3001',
        credentials: true,
      },
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
  providers: [AppService, PrismaService, ArticlesResolver, UserResolver],
})
export class AppModule {}
