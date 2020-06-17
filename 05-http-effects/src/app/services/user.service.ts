import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://reqres.in/api/sdfsdf';

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers() {
    // return EMPTY;
    return this.http.get(`${ this.url }/users`)
      .pipe(map(resp => resp['data']));
  }
}
