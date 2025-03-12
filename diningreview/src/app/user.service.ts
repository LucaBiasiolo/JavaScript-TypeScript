import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean>{
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post('http://localhost:8080/dining-review/users/login', null, {params: params}).pipe(
      map(response => {
       this.loggedIn.next(response != null);
       return response != null;
      })
    )
  }
}
