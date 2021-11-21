import { Injectable } from "@angular/core/";
import {HttpEvent , HttpInterceptor,HttpHandler , HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class ErrorInterpector implements HttpInterceptor{

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("Passou")
        return next.handle(req)
        .catch((error,caught) => {
            
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if (!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo Interpector:");
            console.log(errorObj);

            return Observable.throw(errorObj);
        }) as any;
    }

}

export const ErrorInterpectorProvider = {

    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterpector,
    multi: true,


};