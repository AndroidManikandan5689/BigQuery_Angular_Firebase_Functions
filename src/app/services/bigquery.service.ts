import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GoogleApiService, GoogleAuthService } from '../../../node_modules/ng-gapi/lib/src';

const QUERY_URL: string = `https://us-central1-fcmpoc-be302.cloudfunctions.net/bigQSqlQuery`;

@Injectable({
  providedIn: 'root'
})
export class BigqueryService {

  private endpoint = 'https://content.googleapis.com/bigquery/v2/projects/fcmpoc-be302/queries?alt=json';
  private headers = new HttpHeaders();
  public logged;
  public loading = true;


  constructor(private http: HttpClient,
    private gapiService: GoogleApiService,
    private authService: GoogleAuthService) {
      this.gapiService.onLoad().subscribe();
      this.logged = this.authService.getAuth().subscribe((auth)=>{
        let token = auth.currentUser.get().getAuthResponse().access_token;
        console.log('Is SignedIn = ' + auth.isSignedIn.get());
        this.headers = this.headers.set('Authorization', `Bearer ${token}`);
      },
      (err)=>{
        console.log('Is SignedIn = ' + JSON.stringify(err));
      });
     }

     public read() {
      // optionally spin a loading indicator when a request is performed
      this.loading = true;
      // send the actual query as part of the request body and add the authorization headers
      return this.http.post(this.endpoint, { query: "SELECT * FROM 'fcmpoc-be302.analytics_227677168.events_20200901'" }, { headers: this.headers })
      .subscribe((res)=>{
        console.log(JSON.stringify(res));
      },
      (err)=>{
        console.log(JSON.stringify(err));
      })
  }




  

  onQuery(datasetName: string, q: string) {
    
      const options = {
        headers: new HttpHeaders(
          { 
             'Access-Control-Allow-Origin': '*'
          })
      }

    const postParams = {
      datasetName: datasetName,
      query: q,
      
    };
    return this.http.post(QUERY_URL, postParams, options);
  }
}
