import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { SplashScreen } from '@capacitor/splash-screen';
import { OneSignalService } from './onesignal.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly oneSignalService: OneSignalService = inject(OneSignalService);
  private readonly platform: Platform = inject(Platform);

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
  public deviceId: any;
  public deviceDataTabCounter = 0;
  public hasPushPermission = false;
  public isOptedIn = false;
  public environment = environment;
  public menuStateClass: any;
  public pushId: any;
  public selectedIndex = 0;
  public showDeviceData = false;

  async ngOnInit() {
    await this.initializeApp();
    const path = window.location.pathname.split('news/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }

    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      await this.oneSignalService.initialize();
      this.hasPushPermission = await this.oneSignalService.hasPermission();
      this.isOptedIn = await this.oneSignalService.getOptedIn();
      this.changeDetectorRef.detectChanges();
    }
  }

  async initializeApp(): Promise<void> {
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
    });
  }

  menuState(ev: any) {
    if (ev.type === 'ionDidOpen') {
      this.menuStateClass = 'open';
    } else {
      this.menuStateClass = 'close';
    }
  }

  async deviceData() {
    if (this.deviceDataTabCounter >= 4 && this.showDeviceData === false) {
      this.showDeviceData = true;

      this.pushId = await this.oneSignalService.getOnesignalId();

      this.deviceId = (await Device.getId()).identifier;

      this.changeDetectorRef.detectChanges();

      setTimeout(() => {
        this.showDeviceData = false;
        this.deviceDataTabCounter = 0;
        this.changeDetectorRef.detectChanges();
      }, 15000);
    } else {
      this.deviceDataTabCounter++;
    }
  }

  async onActivatePush() {
    this.oneSignalService.optIn();
    this.hasPushPermission = await this.oneSignalService.hasPermission();
    this.isOptedIn = await this.oneSignalService.getOptedIn();
  }
}
