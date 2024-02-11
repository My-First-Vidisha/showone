import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, of, retry, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';



  // .set('Access-Control-Allow-Credentials', 'true')
  // .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X- Request-With');

@Component({
  selector: 'app-shower',
  templateUrl: './shower.component.html',
  styleUrls: ['./shower.component.css']
})
export class ShowerComponent {

  title = 'showone';

  baseURL: string = ''
  first: string = ''
  second: string = ''
  firstSecond: string = ''
  headers:any;
  token:string='';

  loginRequest:any= {
    "username": "dinesh",
    "password": "dinesh@123"
  }

  constructor(  private http: HttpClient, ) {
    this.baseURL = environment.API_URL
  }


  login(){


    console.log('I am in LOGIN')

    this.headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Methods', 'POST')
  .set('Access-Control-Allow-Origin', '*');

    this.http.post<any>(this.baseURL+"/api/auth/signin", this.loginRequest, { 'headers': this.headers })
    .subscribe((response: any) => {
      this.token = response.token;
      console.log('Login Response :' + response.username);
    });

  }
  getFisrt(){
    console.log('I am in first')
    this.getMessage("/api/first")
    .subscribe({
      next: response =>{
         console.log(response); 
         this.first = response.msg
        //  let a = 0/12
        //  throw new Error('Value expected!');
      },
      error(err) { console.error('Got an Error: ' + err); },
      complete: () => { console.log('Completed'); }
    });
  }


  getSecond(){
    this.getMessage("/api/second")
    .subscribe({
      next: response =>{
         console.log(response); 
         this.second = response.msg
        //  let a = 0/12
        //  throw new Error('Value expected!');
      },
      error(err) { console.error('Got an Error: ' + err); },
      complete: () => { console.log('Completed'); }
    });
  }

  getFisrtSecond(){
    this.getMessage("/api/firstsecond")
    .subscribe({
      next: response =>{
         console.log(response); 
         this.firstSecond = response.msg
        //  let a = 0/12
        //  throw new Error('Value expected!');
      },
      error(err) { console.error('Got an Error: ' + err); },
      complete: () => { console.log('Completed'); }
    });
  }

  getMessage(url:string): Observable<any> {


    let tt:string;

    this.http.post<any>(this.baseURL+"/api/auth/signin", this.loginRequest)
    .subscribe((response: any) => {
      this.token= response.token;
      console.log('Login Response :' + response.username);
      console.log('Login Response :' + response.token);
    });

    console.log("token  : "+this.token)
    this.token = "Bearer " +this.token  
    console.log("main api call>> ")
    console.log("token  : "+this.token)
    this.headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', this.token)
  .set('Access-Control-Allow-Methods', 'GET')
  .set('Access-Control-Allow-Origin', '*');
    console.log(this.baseURL + url)
    return this.http.get<any>(this.baseURL + url, { 'headers': this.headers }).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),//need to check more
      map((res: any) => {
        // throw new Error('Value expected!');
        if (!res) {
          throw new Error('Value expected!');

          // throwError () ->new Error('Value expected!');
        }
        return res;
      }),
      /*
       * Catch the error, either from the AJAX call or from the map operator,
       * and return an observable of empty array.
       * The `catchError` argument must be a function that returns an observable.
       */
      retry(3),
      catchError(() => {
        console.log('Error occurd at calling API')
        // throw new Error('Value expected!');
        return of();
      })
    );
  }
}
