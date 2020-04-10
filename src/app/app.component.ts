import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LiveupdateService} from './liveupdate.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    menuStateClass: any;
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
        private liveUpdate: LiveupdateService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
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
}
