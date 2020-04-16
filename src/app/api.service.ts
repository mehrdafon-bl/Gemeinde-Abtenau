import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly loadingAnimationText = 'Daten werden geladen';
    readonly toastApiErrorText = 'Ein Fehler ist aufgetreten. Bitte überprüfen Sie die Internetverbindung oder versuchen Sie es später noch ein mal.';

    readonly apiUrl = 'http://www.abtenau.at/api';

    loadingAnimation: any;

    inAppBrowserOptionsAndroid: InAppBrowserOptions = {
        allowInlineMediaPlayback: 'yes',
        beforeload: 'yes',
        clearcache: 'yes',
        cleardata: 'yes',
        clearsessioncache: 'yes',
        closebuttoncaption: '×',
        closebuttoncolor: '#ffffff',
        footer: 'no',
        footercolor: '#00649c',
        hardwareback: 'yes',
        hidden: 'no',
        hidenavigationbuttons: 'yes',
        hideurlbar: 'yes',
        lefttoright: 'no',
        location: 'yes',
        mediaPlaybackRequiresUserAction: 'yes',
        navigationbuttoncolor: '#ffffff',
        shouldPauseOnSuspend: 'yes',
        toolbarcolor: '#00649c',
        useWideViewPort: 'yes',
        zoom: 'yes'
    };

    inAppBrowserOptionsiOS: InAppBrowserOptions = {
        allowInlineMediaPlayback: 'yes',
        closebuttoncaption: '×',
        closebuttoncolor: '#ffffff',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes',
        hidenavigationbuttons: 'yes',
        hidespinner: 'no',
        lefttoright: 'no',
        location: 'no',
        navigationbuttoncolor: '#ffffff',
        toolbar: 'yes',
        toolbarcolor: '#00649c',
        toolbarposition: 'bottom',
        usewkwebview: 'yes',
    };

    constructor(
        private http: HttpClient,
        public loadingController: LoadingController,
        public toastController: ToastController,
        private iab: InAppBrowser,
        public platform: Platform) {
    }

    get(url: string, showLoading = true): Observable<any> {
        if (showLoading) {
            this.showLoading();
        }

        const returnObservable = new Observable(observer => {
            const httpObserver = this.http.get(this.apiUrl + url);
            httpObserver.subscribe(
                data => {
                    if (showLoading) {
                        this.loadingAnimation.dismiss();
                    }

                    observer.next(data);
                },
                error => {
                    if (showLoading) {
                        this.loadingAnimation.dismiss();
                    }

                    this.showToastApiError();

                    observer.error(error);
                });
        });

        return returnObservable;
    }

    async showLoading() {
        this.loadingAnimation = await this.loadingController.create({
            message: this.loadingAnimationText,
            duration: 5000
        });

        await this.loadingAnimation.present();
    }

    async showToastApiError() {
        const toast = await this.toastController.create({
            message: this.toastApiErrorText,
            position: 'middle',
            duration: 4000
        });

        toast.present();
    }

    openUrl(url: any) {
        if (url.indexOf('.pdf') > -1 && this.platform.is('android')) {
            this.inAppBrowserOptionsAndroid.zoom = 'no';

            this.iab.create(
                this.apiUrl + '/pdf/web/viewer.html?file=' + url,
                '_blank',
                this.inAppBrowserOptionsAndroid
            );
        } else if (this.platform.is('ios')) {
            this.iab.create(url, '_blank', this.inAppBrowserOptionsiOS);
        } else {
            this.iab.create(url, '_blank', this.inAppBrowserOptionsAndroid);
        }
    }
}
