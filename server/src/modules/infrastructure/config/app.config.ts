import { Configuration, Value } from '@itgorillaz/configify'
import { Transform } from 'class-transformer'

@Configuration()
export class AppConfig {
  public readonly nestUrl: string

  constructor() {
    this.nestUrl = `${this.protocol}://${this.host}:${this.port}`
  }

  @Value('APP_PROTOCOL')
  public readonly protocol!: string

  @Transform(({ value }) => Number(value))
  @Value('NEST_PORT')
  public readonly port!: number

  @Value('NEST_HOST')
  public readonly host!: string

  @Value('VITE_ORIGIN_URL')
  public readonly webUrl!: string
}

