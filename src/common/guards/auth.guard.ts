import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseAdmin } from './../../configs/firebase.setup';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const idToken = authorization.split(' ')[1];

    try {
      const claims = await app.auth().verifyIdToken(idToken);
      request.user = claims;

      const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
      if (permissions && !permissions.includes(claims.role)) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
