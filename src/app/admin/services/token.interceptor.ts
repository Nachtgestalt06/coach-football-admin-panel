import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  // Adds the token to your headers if it exists
  private static addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
      return clone;
    }

    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('Authorization');
    console.log('Este es el token ', token);
    const clonedReq = TokenInterceptor.addToken(request, token);
    return next.handle(clonedReq).pipe(
      catchError(error => {
        // Perhaps display an error for specific status codes here already?
        const msg = error.message;
        console.error('Error: ' + msg);
        // Pass the error to the caller of the function
        return throwError(error);
      })
    );
  }
}
