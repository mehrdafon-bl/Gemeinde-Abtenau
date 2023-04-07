import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx';
import {LiveupdateService} from './liveupdate.service';
import {OneSignal} from '@awesome-cordova-plugins/onesignal/ngx';
import {Device} from '@awesome-cordova-plugins/device/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    menuStateClass: any;
    pushId: any;
    deviceId: any;
    deviceDataTabCounter = 0;
    showDeviceData = false;
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Aktuelles',
            url: '/news',
            icon: 'newspaper'
        },
        {
            title: 'Termine',
            url: '/events',
            icon: 'calendar'
        },
        {
            title: 'Amtstafel',
            url: '/official-board',
            icon: 'book'
        },
        {
            title: 'Gemeinde Abteilungen',
            url: '/official-departments',
            icon: 'people'
        },
        {
            title: 'Impressum / Datenschutz',
            url: '/imprint',
            icon: 'document'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public liveUpdate: LiveupdateService,
        private oneSignal: OneSignal,
        private device: Device
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initOneSignal();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('news/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }

        this.liveUpdate.checkForUpdates(10000);
    }

    menuState(ev: any) {
        if (ev.type === 'ionDidOpen') {
            this.menuStateClass = 'open';
        } else {
            this.menuStateClass = 'close';
        }
    }

    initOneSignal() {
        if (this.device.cordova != null && (this.platform.is('android') || this.platform.is('ios'))) {
            this.oneSignal
                .startInit('c396d07c-01d8-4fb4-a19a-2bf02848f379', '978176498034')
                .inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)
                .endInit();
        }
    }

    deviceData() {
        if (this.deviceDataTabCounter >= 4 && this.showDeviceData === false) {
            this.showDeviceData = true;

            this.oneSignal.getIds().then(data => {
                this.pushId = data.userId;
            });

            this.deviceId = this.device.uuid;

            setTimeout(
                () => {
                    this.showDeviceData = false;
                    this.deviceDataTabCounter = 0;
                }, 15000
            );
        } else {
            this.deviceDataTabCounter++;
        }
    }
}
