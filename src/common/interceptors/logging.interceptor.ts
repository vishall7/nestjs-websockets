import {
  NestInterceptor,
  Injectable,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const requestId = this.cls.getId();
    console.log(`Request<${requestId}> come in...`);
    const start = performance.now();
    return next.handle().pipe(
      tap({
        next: () => {
          const end = performance.now();
          console.log(`Response sent... Time taken: ${end - start} ms`);
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.log(`Request<${requestId}> failed with ${message}`);
        },
      }),
    );
  }
}
