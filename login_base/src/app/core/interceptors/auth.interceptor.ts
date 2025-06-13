import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');
  if(request.url.substring(0,36) != 'http://gaia.inegi.org.mx/sakbe_v3.1/'){
  request = request.clone({
    setHeaders: {
      Authorization: token ? 'Bearer ' + token : '',
      'x-access-token': token ? token : '' 
    }
  });
  }
  
  
  return next(request);
}