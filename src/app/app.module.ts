import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
  } from '../../node_modules/ng-gapi/lib/src';
  
  const gapiClientConfig: NgGapiClientConfig = {
    // client_id: '241348575786-nhok7e5smah6dc9a4170hoq2fmg1q1ed.apps.googleusercontent.com', // your client ID
    client_id: '234577674480-4ko06mfabb0hfflg15q3sa61pepftrm6.apps.googleusercontent.com',  //Fcm
    discoveryDocs: ['https://content.googleapis.com/discovery/v1/apis/bigquery/v2/rest'],
    scope: [
       'https://www.googleapis.com/auth/bigquery',
       'https://www.googleapis.com/auth/cloud-platform',
       'https://www.googleapis.com/auth/cloud-platform.read-only'
    ].join(' ')
    };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // GoogleApiModule.forRoot({
    // provide: NG_GAPI_CONFIG,
    // useValue: gapiClientConfig
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
