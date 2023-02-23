import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  // Currently calling GET and POST...
  call(url: string, actionType: string, data?: any): Observable<any> {
    if (actionType.toUpperCase() == "GET") {
      let queryParams: HttpParams = new HttpParams();

      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property)) {
            queryParams = queryParams.set(property, data[property]);
          }
        }
      }

      return this.http.get(url, { params: queryParams });
    }
    else if (actionType.toUpperCase() == "POST") {
      if (data) {
        return this.http.post(url, data);
      }
    }

    return new Observable<any>();
  }
}
