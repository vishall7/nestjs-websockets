import { BadRequestException, Injectable, StandardSchemaValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidationPipe extends StandardSchemaValidationPipe {
  constructor() {
    super({
      exceptionFactory: (issues) =>
        new BadRequestException({
          message: 'Validation failed',
          details: issues,
        }),
    });
  }
}
