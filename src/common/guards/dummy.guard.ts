import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DummyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
