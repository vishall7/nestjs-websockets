import {
  BadRequestException,
  HttpStatus,
  Injectable,
  StandardSchemaValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe extends StandardSchemaValidationPipe {
  constructor() {
    super({
      exceptionFactory: (issues) => {
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          issues,
        });
      },
    });
  }
}
