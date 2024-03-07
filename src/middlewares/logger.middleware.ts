import {
    Injectable,
    Logger,
    NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl, headers, body } = req;
        const reqHeader = JSON.stringify(headers);
        const reqBody = JSON.stringify(body);
        const datetime = new Date();
        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `${datetime} ${method} ${originalUrl} ${statusCode} ${ip} \nheaders: ${reqHeader},\nbody: ${reqBody}`,
            );
        });

        next();
    }
}