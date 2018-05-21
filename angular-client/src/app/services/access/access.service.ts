import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { UserDetails, TokenUser } from '../../models/access/access.model';

@Injectable()
export class AccessService {

    private token: string;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
    });

    /**
     * AccessService Constructor
     * @param {HttpClient} http 
     */
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('ormigga-token', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('ormigga-token');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: Object): Observable<any> {
        let base;
        if (method === 'post') {
            base = this.http.post(`/api/${type}`, user);
        } else {
            base = this.http.get(`/api/${type}`, { headers: this.headers });
        }

        const request = base.pipe(
            map((data: TokenUser) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            }),
            retry(3),
            catchError(this.handleError)
        );

        return request;
    }

    public register(user: Object): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: Object): Observable<any> {
        return this.request('post', 'login', user);
    }

    public profile(): Observable<any> {
        return this.request('get', 'profile');
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('ormigga-token');
        this.router.navigateByUrl('/');
    }

    /**
     * Handle Http operation that failed
     * @param operation 
     * @param result 
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}