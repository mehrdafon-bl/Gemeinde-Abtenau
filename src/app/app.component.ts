import { Component, inject, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { LiveupdateService } from './liveupdate.service';
import { OneSignalService } from './onesignal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly oneSignalService: OneSignalService = inject(OneSignalService);
  public liveUpdate: LiveupdateService = inject(LiveupdateService);

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
      icon: 'newspaper',
    },
    {
      title: 'Termine',
      url: '/events',
      icon: 'calendar',
    },
    {
      title: 'Amtstafel',
      url: '/official-board',
      icon: 'book',
    },
    {
      title: 'Gemeinde Abteilungen',
      url: '/official-departments',
      icon: 'people',
    },
    {
      title: 'Impressum / Datenschutz',
      url: '/imprint',
      icon: 'document',
    },
  ];

  constructor() {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    await SplashScreen.hide();
  }

  async ngOnInit() {
    const path = window.location.pathname.split('news/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }

    this.liveUpdate.checkForUpdates(10000);
    await this.oneSignalService.initialize();
  }

  menuState(ev: any) {
    if (ev.type === 'ionDidOpen') {
      this.menuStateClass = 'open';
    } else {
      this.menuStateClass = 'close';
    }
  }
}
