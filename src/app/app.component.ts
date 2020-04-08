import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
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
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            /*const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

            this.toggleDarkTheme(prefersDark.matches);
            prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));*/
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('news/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }

    /*toggleDarkTheme(shouldAdd) {
        document.body.classList.toggle('dark', shouldAdd);
    }*/
}
