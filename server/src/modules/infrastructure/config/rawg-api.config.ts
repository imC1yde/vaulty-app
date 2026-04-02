import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class RawgConfig {
  @Value('RAWG_API_URL')
  public readonly url!: string

  @Value('RAWG_API_KEY')
  public readonly accessKey!: string
}
