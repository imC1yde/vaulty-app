import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { AppModule } from '@src/modules/app.module'
import * as fs from 'fs'
import { printSchema } from 'graphql'
import * as path from 'path'

async function generate() {
  process.env.SKIP_CONNECTIONS = 'true'

  const logger = new Logger('generate')
  const app = await NestFactory.createApplicationContext(AppModule)
  const host = app.get(GraphQLSchemaHost)
  const schema = host.schema
  const schemaString = printSchema(schema)

  fs.writeFileSync(path.join(process.cwd(), 'src/schema.gql'), schemaString)
  await app.close()

  logger.log('GraphQL schema in src/schema.gql generated successfully')
}

generate()
