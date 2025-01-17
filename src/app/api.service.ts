import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';
import { Browser } from '@capacitor/browser';
// import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly loadingAnimationText = 'Daten werden geladen';
    readonly toastApiErrorText = 'Ein Fehler ist aufgetreten. ' +
        'Bitte überprüfen Sie die Internetverbindung oder versuchen Sie es später noch ein mal.';

    readonly websiteUrl = 'https://www.abtenau.at';
    readonly apiUrl = this.websiteUrl + '/api-dev';

    loadingAnimation: any;

    // inAppBrowserOptionsAndroid: AndroidWebViewOptions = {
    //     allowZoom: true,
    //     hardwareBack: true,
    //     pauseMedia: true,
    // };

    // inAppBrowserOptionsiOS: iOSWebViewOptions = {
    //     allowOverScroll: true,
    //     enableViewportScale: true,
    //     allowInLineMediaPlayback: true,
    //     surpressIncrementalRendering: true,
    //     viewStyle: iOSViewStyle.FULL_SCREEN,
    //     animationEffect: iOSAnimation.FLIP_HORIZONTAL
    // };

    constructor(
        private http: HttpClient,
        public loadingController: LoadingController,
        public toastController: ToastController,
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
            duration: 4000
        });

        await this.loadingAnimation.present();
    }

    async showToastApiError() {
        const toast = await this.toastController.create({
            message: this.toastApiErrorText,
            position: 'bottom',
            duration: 3000
        });

        toast.present();
    }

    async getBase64(file: File | Blob): Promise<any> 
{
     return new Promise((resolve, reject) => 
     {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onloadend = () => resolve(reader.result);
          reader.onerror = error => reject(error);
     });
}

    async openUrl(url: any) {
        // if (url.indexOf('.pdf') > -1) {
        //     const blob = await (await fetch(url)).blob();


        //     const writeOptions: WriteFileOptions = 
        //     {
        //         path: `${filename}`,
        //         directory: Directory.Cache,
        //         data: base64
        //     }
        
        //     const writeResult = await Filesystem.writeFile(writeOptions);
        
        //     const options: FileOpenerOptions = 
        //     {
        //         filePath: writeResult.uri,
        //         contentType: blob.type,
        //         openWithDefault: true,
        //     };
            
        //     await FileOpener.open(options);
        // } else {
            await Browser.open({ url });
        // }
        // if (url.indexOf('.pdf') > -1 && this.platform.is('android')) {
        //     this.inAppBrowserOptionsAndroid.allowZoom = false;
        //     DefaultWebViewOptions.android = this.inAppBrowserOptionsAndroid;


        //     await InAppBrowser.openInWebView({
        //         url: this.apiUrl + '/pdf/web/viewer.html?file=' + url,
        //         options: {
        //             ...DefaultWebViewOptions,
        //             android: this.inAppBrowserOptionsAndroid
        //         }
        //     });
        // } else if (this.platform.is('ios')) {
        //     await InAppBrowser.openInWebView({
        //         url,
        //         options: {
        //             ...DefaultWebViewOptions,
        //             iOS: this.inAppBrowserOptionsiOS
        //         }
        //     });
        // }
    }
}
