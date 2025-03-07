import { Injectable } from '@angular/core';
import OneSignal, { OSNotificationPermission } from 'onesignal-cordova-plugin';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OneSignalService {
  public async initialize(): Promise<void> {
    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      try {
        let canInit = false;
        OneSignal.initialize(environment.oneSignalId);
        // Uncomment to set OneSignal device logging to VERBOSE
        OneSignal.Debug.setLogLevel(6);

        if (Capacitor.getPlatform() === 'ios') {
          const hasIosPermission = await OneSignal.Notifications.permissionNative();
          console.log('🚀 ~ OneSignalService ~ initialize ~ hasIosPermission:', hasIosPermission);
          if (hasIosPermission !== OSNotificationPermission.Authorized) {
          }
        }

        const hasBeenPrompted = await OneSignal.Notifications.canRequestPermission();
        console.log('🚀 ~ AppComponent ~ initOneSignal ~ hasBeenPrompted:', hasBeenPrompted);
        const hasPermission = await OneSignal.Notifications.getPermissionAsync();
        console.log('🚀 ~ AppComponent ~ initOneSignal ~ hasPermission:', hasPermission);

        if (!hasPermission) {
          console.log('🚀 ~ initialize ~ requestPermission:');
          canInit = await OneSignal.Notifications.requestPermission(true);
          console.log('🚀 ~ initialize ~ canInit:', canInit);
        }

        if (hasPermission) {
          canInit = true;
        }

        if (!canInit) {
          return;
        }

        const deviceId = await Device.getId();
        console.log('🚀 ~ AppComponent ~ initOneSignal ~ deviceId:', deviceId);
        const result = OneSignal.login(deviceId.identifier);
        console.log('🚀 ~ AppComponent ~ initOneSignal ~ result:', result);
        const userId = await OneSignal.User.getOnesignalId();
        console.log('🚀 ~ AppComponent ~ initOneSignal ~ userId:', userId);
        const externalId = await OneSignal.User.getExternalId();
        console.log('🚀 ~ OneSignalService ~ initialize ~ externalId:', externalId);
        const isOptedIn = await OneSignal.User.pushSubscription.getOptedInAsync();
        console.log('🚀 ~ OneSignalService ~ initialize ~ isOptedIn:', isOptedIn);
        OneSignal.User.pushSubscription.optIn();
        console.log('----------- end init one signal -----------');
      } catch (error) {
        console.error('🚀 ~ OneSignalService ~ initialize ~ Error initializing OneSignal:', error);
      }
    }
  }

  public async getOnesignalId(): Promise<string | null> {
    return await OneSignal.User.getOnesignalId();
  }

  public async hasPermission(): Promise<boolean> {
    return await OneSignal.Notifications.getPermissionAsync();
  }

  public optIn(): void {
    OneSignal.User.pushSubscription.optIn();
  }

  public async getOptedIn(): Promise<boolean> {
    return await OneSignal.User.pushSubscription.getOptedInAsync();
  }

  public async requestPermission(): Promise<void> {
    await OneSignal.Notifications.requestPermission(true);
  }
}
