import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
    selector: 'app-official-departments',
    templateUrl: './official-departments.page.html',
    styleUrls: ['./official-departments.page.scss'],
})
export class OfficialDepartmentsPage implements OnInit {
    officialDepartments: any = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getApiData();
    }

    getApiData(isRefresher = false) {
        const api = this.api.get('/official-departments');
        api.subscribe(
            next => {
                this.officialDepartments = next.data.officialDepartments;
            },
            error => {
                console.log(error);
            }
        );
    }

}
