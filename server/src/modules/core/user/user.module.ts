import { Module } from '@nestjs/common';
import { UserResolver } from '@src/modules/core/user/user.resolver';
import { UserService } from '@src/modules/core/user/user.service';

@Module({
  providers: [ UserResolver, UserService ],
  exports: [ UserService ]
})
export class UserModule {}
