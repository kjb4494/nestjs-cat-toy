import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// https://docs.nestjs.com/recipes/passport#login-route
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
