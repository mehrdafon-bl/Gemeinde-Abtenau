import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
    selector: 'app-imprint',
    templateUrl: './imprint.page.html',
    styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {

    imprintDataProtection: any = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getApiData();
    }

    getApiData(isRefresher = false) {
        const api = this.api.get('/imprint-data-protection');
        api.subscribe(
            next => {
                this.imprintDataProtection = next.data.imprintDataProtection;
            },
            error => {
                console.log(error);
            }
        );
    }

}
