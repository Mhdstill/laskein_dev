/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Masquer la propriété 'password' si elle existe
        if (Array.isArray(data)) {
          return data.map((item) => this.removePassword(item));
        } else {
          return this.removePassword(data);
        }
      }),
    );
  }

  private removePassword(data: any): any {
    if (data && data.password) {
      const { password, isAdmin, isMember, ...rest } = data;
      return rest;
    }
    return data;
  }
}
