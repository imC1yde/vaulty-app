export class AppConfig {
  static readonly NEST_ORIGIN_URL: string = import.meta.env.VITE_SERVER_URL
  static readonly PROTOCOL: string = import.meta.env.VITE_PROTOCOL
  static readonly APP_HOST: string = import.meta.env.VITE_HOST
}