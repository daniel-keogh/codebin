import { AuthGuard } from '@nestjs/passport';

export class OptionalJwtGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    return user;
  }
}
