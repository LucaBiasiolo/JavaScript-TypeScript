import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): void{
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    this.http.post('http://localhost:8080/dining-review/users/login', null, {params: params}).subscribe(
      (response) => console.log('Response: ' + response)
    )
  }
}
