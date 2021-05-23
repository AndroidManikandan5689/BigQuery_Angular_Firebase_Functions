import { Component } from '@angular/core';
import { BigqueryService } from './services/bigquery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BigQueryAngularv8';
  myDatasetName = 'analytics_227677168';
  myTableName = 'events_20200901';
  todolist: any[] = [];


  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;


  constructor(private bqSrv: BigqueryService){

  }
  
  selectTotalUser() {
    const q = `SELECT event_date,count(*),platform,event_name FROM fcmpoc-be302.analytics_227677168.events_20200901 where (event_name = "app_remove" or event_name = "first_open") and  (platform = "ANDROID" or platform = "IOS") group by platform, event_date, event_name`;
    this.bqSrv.onQuery(this.myDatasetName, q)
      .subscribe(result => {
        console.log(result);
        if (!result)
          return;
        const data = result['result'][0];
        this.todolist = data;

      });
  }


  
  // async ngOnInit() {
  //   if (await this.checkIfUserAuthenticated()) {
  //     this.user = this.authInstance.currentUser.get();
  //   }
  // }

  // async checkIfUserAuthenticated(): Promise<boolean> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   return this.authInstance.isSignedIn.get();
  // }

  // readData(){
  //   const data = this.bqSrv.read();
  // }

  // async authenticate(): Promise<gapi.auth2.GoogleUser> {
  //   // Initialize gapi if not done yet
  //   if (!this.gapiSetup) {
  //     await this.initGoogleAuth();
  //   }

  //   // Resolve or reject signin Promise
  //   return new Promise(async () => {
  //     await this.authInstance.signIn().then(
  //       user => this.user = user,
  //       error => this.error = error);
  //   });
  // }

  // async initGoogleAuth(): Promise<void> {
  //   //  Create a new Promise where the resolve 
  //   // function is the callback passed to gapi.load
  //   const pload = new Promise((resolve) => {
  //     gapi.load('auth2', resolve);
  //   });

  //   // When the first promise resolves, it means we have gapi
  //   // loaded and that we can call gapi.init
  //   return pload.then(async () => {
  //     await gapi.auth2
  //     .getAuthInstance()
  //       // .init({ client_id: '241348575786-nhok7e5smah6dc9a4170hoq2fmg1q1ed.apps.googleusercontent.com' })
  //       .then(auth => {
  //         this.gapiSetup = true;
  //         this.authInstance = auth;
  //       });
  //   });
  // }

}
