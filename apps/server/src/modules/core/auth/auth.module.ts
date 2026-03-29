import { Module } from '@nestjs/common';
import { AuthResolver } from '@src/modules/core/auth/auth.resolver';
import { AuthService } from '@src/modules/core/auth/auth.service';
import { UserModule } from "@src/modules/core/user/user.module";

@Module({
  providers: [ AuthResolver, AuthService ],
  imports: [ UserModule ]
})
export class AuthModule {}
