import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const newRequest = req.clone({
        headers: req.headers.append(
            'Authorization',
            `Bearer ${environment.token}`,
        ),
    });

    return next(newRequest);
};
