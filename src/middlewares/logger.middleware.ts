import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers, params, query, body } = req;
    const reqHeader = JSON.stringify(headers);
    const reqBody = JSON.stringify(body);
    const reqParmas = JSON.stringify(params);
    const reqQuery = JSON.stringify(query);

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${ip} \n[Request] headers: ${reqHeader}, params: ${reqParmas}, query: ${reqQuery}, body: ${reqBody}`,
      );
    });

    next();
  }
}
