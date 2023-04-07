import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx';
import {Deploy} from 'cordova-plugin-ionic/dist/ngx';
import {InAppBrowser} from '@awesome-cordova-plugins/in-app-browser/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {OneSignal} from '@awesome-cordova-plugins/onesignal/ngx';
import {Device} from '@awesome-cordova-plugins/device/ngx';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        DatePipe,
        Deploy,
        InAppBrowser,
        OneSignal,
        Device,
        SQLite,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
