import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: +process.env.JWT_EXPIRY,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
