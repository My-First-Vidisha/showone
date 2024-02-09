import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, retry, shareReplay } from 'rxjs';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Methods', 'GET')
  .set('Access-Control-Allow-Origin', '*');
  // .set('Access-Control-Allow-Credentials', 'true')
  // .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X- Request-With');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showone';

  // baseURL: string = ''
  // first: string = ''
  // second: string = ''
  // firstSecond: string = ''

  // constructor(  private http: HttpClient, ) {
  //   this.baseURL = environment.API_URL
  // }

  // getFisrt(){
  //   console.log('I am in first')
  //   this.getMessage("/api/first")
  //   .subscribe({
  //     next: response =>{
  //        console.log(response); 
  //        this.first = response
  //       //  let a = 0/12
  //       //  throw new Error('Value expected!');
  //     },
  //     error(err) { console.error('Got an Error: ' + err); },
  //     complete: () => { console.log('Completed'); }
  //   });
  // }

  // getSecond(){
  //   this.getMessage("/api/second")
  //   .subscribe({
  //     next: response =>{
  //        console.log(response); 
  //        this.second = response
  //       //  let a = 0/12
  //       //  throw new Error('Value expected!');
  //     },
  //     error(err) { console.error('Got an Error: ' + err); },
  //     complete: () => { console.log('Completed'); }
  //   });
  // }

  // getFisrtSecond(){
  //   this.getMessage("/api/first-second")
  //   .subscribe({
  //     next: response =>{
  //        console.log(response); 
  //        this.firstSecond = response
  //       //  let a = 0/12
  //       //  throw new Error('Value expected!');
  //     },
  //     error(err) { console.error('Got an Error: ' + err); },
  //     complete: () => { console.log('Completed'); }
  //   });
  // }

  // getMessage(url:string): Observable<any> {
  //   console.log(this.baseURL + url)
  //   return this.http.get<any>(this.baseURL + url, { 'headers': headers }).pipe(
  //     shareReplay({ bufferSize: 1, refCount: false }),//need to check more
  //     map((res: any) => {
  //       // throw new Error('Value expected!');
  //       if (!res) {
  //         throw new Error('Value expected!');

  //         // throwError () ->new Error('Value expected!');
  //       }
  //       return res;
  //     }),
  //     /*
  //      * Catch the error, either from the AJAX call or from the map operator,
  //      * and return an observable of empty array.
  //      * The `catchError` argument must be a function that returns an observable.
  //      */
  //     retry(3),
  //     catchError(() => {
  //       console.log('Error occurd at calling API')
  //       // throw new Error('Value expected!');
  //       return of();
  //     })
  //   );
  // }
}
