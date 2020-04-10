import {Injectable} from '@angular/core';
import {Deploy} from 'cordova-plugin-ionic/dist/ngx';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LiveupdateService {
    build: any;
    updateProgress: any;
    showUpdateProcess = false;
    updateProcessType: any;

    constructor(
        private ionicDeploy: Deploy,
        public toastController: ToastController,
        public alertController: AlertController) {
    }

    async showAlertUpdateAvaliable() {
        const alert = await this.alertController.create({
            header: 'Eine neue App-Version',
            message: 'Die App wird im Hintergund aktualisiert und neugeladen.',
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.performUpdate();
                },
            }]
        });

        await alert.present();
    }

    async checkForUpdates(time) {
        const update = await this.ionicDeploy.checkForUpdate();

        if (update.available) {
            setTimeout(() => {
                this.showAlertUpdateAvaliable();

                this.build = update.build;
            }, time);
        }

        this.build = update.build;
    }

    async performUpdate() {
        await this.ionicDeploy.downloadUpdate((progress) => {
            this.showUpdateProcess = true;
            this.updateProcessType = 'Herunterladen';
            this.updateProgress = progress;
        });

        await this.ionicDeploy.extractUpdate((progress) => {
            this.updateProcessType = 'Exportieren';
            this.updateProgress = progress;
        });

        await this.ionicDeploy.reloadApp();

        console.log('# perform update');
    }
}
