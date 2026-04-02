import { Module } from '@nestjs/common';
import { AuthModule } from "@src/modules/core/auth/auth.module";
import { UserModule } from '@src/modules/core/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule
  ]
})
export class CoreModule {}
