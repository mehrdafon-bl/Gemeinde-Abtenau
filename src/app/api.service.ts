import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly loadingAnimationText = 'Daten werden geladen';
  readonly toastApiErrorText =
    'Ein Fehler ist aufgetreten. ' +
    'Bitte überprüfen Sie die Internetverbindung oder versuchen Sie es später noch ein mal.';

  readonly websiteUrl = 'https://www.abtenau.at';
  readonly apiUrl = this.websiteUrl + '/api-dev';

  loadingAnimation: any;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {}

  get(url: string, showLoading = true): Observable<any> {
    if (showLoading) {
      this.showLoading();
    }

    const returnObservable = new Observable((observer) => {
      const httpObserver = this.http.get(this.apiUrl + url);
      httpObserver.subscribe(
        (data) => {
          if (showLoading && this.loadingAnimation) {
            this.loadingAnimation.dismiss();
          }

          observer.next(data);
        },
        (error) => {
          if (showLoading && this.loadingAnimation) {
            this.loadingAnimation.dismiss();
          }

          this.showToastApiError();

          observer.error(error);
        },
      );
    });

    return returnObservable;
  }

  async showLoading() {
    this.loadingAnimation = await this.loadingController.create({
      message: this.loadingAnimationText,
      duration: 4000,
    });

    await this.loadingAnimation.present();
  }

  async showToastApiError() {
    const toast = await this.toastController.create({
      message: this.toastApiErrorText,
      position: 'bottom',
      duration: 3000,
    });

    toast.present();
  }

  async openUrl(url: string, filename?: string) {
    await Browser.open({ url });
  }
}
