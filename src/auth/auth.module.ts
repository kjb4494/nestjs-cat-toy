import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '30m' },
    // }),
    // 위 코드를 사용하면 .env에서 환경변수를 읽어오기 전에 register 되기 때문에 아래와 같이 작성
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
    // https://docs.nestjs.com/fundamentals/circular-dependency#module-forward-reference
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
