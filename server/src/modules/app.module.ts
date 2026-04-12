import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { CatalogModule } from '@src/modules/catalog/catalog.module'
import { CoreModule } from '@src/modules/core/core.module'
import { InfrastructureModule } from '@src/modules/infrastructure/infrastructure.module'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { join } from "path"

@Module({
  imports: [
    InfrastructureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      introspection: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate'
      },
      context: ({ req, res }) => ({ req, res })
    }),
    CoreModule,
    CatalogModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        graphqlUploadExpress({
          maxFileSize: 64 * 1024 * 1024,
          maxFiles: 2
        })
      )
      .forRoutes('graphql')
  }
}