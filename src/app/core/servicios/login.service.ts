import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    
    private logiantrigered$ = new BehaviorSubject<boolean>(false)

    public  isLoading$ = this.logiantrigered$.asObservable()

    setIsLogin(value: boolean):void{
        this.logiantrigered$.next(value);
    }

}
