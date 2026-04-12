import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/modules/app.module'
import { AppConfig } from '@src/modules/infrastructure/config/app.config'
import cookieParser from 'cookie-parser'

class Application {
  private static logger = new Logger('Bootstrap')

  public static async bootstrap() {
    const app = await NestFactory.create(AppModule)

    const appConfig = app.get(AppConfig)

    this.setupMiddleware(app)
    this.setupGlobals(app)
    this.setupCors(app, appConfig)

    await app.listen(appConfig.port)

    this.logger.log(`Server is running on port: ${appConfig.port}`)
  }

  private static setupCors(app, config: AppConfig) {
    app.enableCors({
      origin: config.webUrl,
      credentials: true
    })
  }

  private static setupMiddleware(app) {
    app.use(cookieParser())
  }

  private static setupGlobals(app) {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    )
  }
}

Application.bootstrap()