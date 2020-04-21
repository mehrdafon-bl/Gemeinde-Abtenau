import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {SqliteService} from '../sqlite.service';

@Component({
    selector: 'app-official-departments',
    templateUrl: './official-departments.page.html',
    styleUrls: ['./official-departments.page.scss'],
})
export class OfficialDepartmentsPage implements OnInit {
    officialDepartments: any = [];

    constructor(
        private api: ApiService,
        private sqLite: SqliteService) {
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

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['official-departments'])
                    .then((data) => {
                        if (data.rows.length > 1 || data.rows.length < 1) {
                            this.sqLite.db.executeSql('DELETE FROM api_content WHERE api_path = ?', ['official-departments'])
                                .then(() => {
                                    this.sqLite.db.executeSql(
                                        'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                                        ['official-departments', JSON.stringify(this.officialDepartments)])
                                        .then(() => {
                                        })
                                        .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                                })
                                .catch((ed) => console.log('#delete dberror: ' + JSON.stringify(ed)));
                        } else {
                            this.sqLite.db.executeSql(
                                'UPDATE api_content SET api_data = ? WHERE api_path = ?',
                                [JSON.stringify(this.officialDepartments), 'official-departments'])
                                .then(() => {
                                })
                                .catch((eu) => console.log('#update dberror: ' + JSON.stringify(eu)));
                        }
                    })
                    .catch((es) => {
                        console.log('#select dberror: ' + JSON.stringify(es));

                        this.sqLite.db.executeSql(
                            'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                            ['official-departments', JSON.stringify(this.officialDepartments)])
                            .then(() => {
                            })
                            .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                    });
            },
            error => {
                console.log(error);

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['official-departments'])
                    .then((data) => {
                        for (let i = 0; i < data.rows.length; i++) {
                            this.officialDepartments = JSON.parse(data.rows.item(i).api_data);
                        }
                    })
                    .catch((es) => console.log('#select error: ' + JSON.stringify(es)));
            }
        );
    }

}
