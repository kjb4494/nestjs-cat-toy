import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// https://docs.nestjs.com/middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('LoggerMiddleware');
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.ip} ${req.method} `);

    res.on('finish', () => {
      this.logger.log(
        `${req.originalUrl} ${req.ip} ${req.method} ${res.statusCode}`,
      );
    });

    next();
  }
}
