import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
    selector: 'app-official-board',
    templateUrl: './official-board.page.html',
    styleUrls: ['./official-board.page.scss'],
})
export class OfficialBoardPage implements OnInit {

    boardItems: any = [];
    boardItemsRaw: any = [];
    refresherEvent: any = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getApiData();
    }

    getApiData(isRefresher = false) {
        const api = this.api.get('/official-board', isRefresher ? false : true);
        api.subscribe(
            next => {
                this.boardItems = next.data.officialBoard;
                this.boardItemsRaw = this.boardItems;

                if (isRefresher) {
                    this.refresherEvent.target.complete();
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    doRefresh(event) {
        this.refresherEvent = event;
        this.getApiData(true);
    }

    searchItems(ev: any) {
        const q = ev.target.value;
        this.boardItems = this.boardItemsRaw;

        if (q && q.trim() !== '') {
            this.boardItems = this.boardItems.filter((item) => {
                if (q && q.trim() !== '') {
                    if (item.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                        return true;
                    } else if (item.content.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                        return true;
                    }
                }
            });
        } else {
            this.boardItems = this.boardItemsRaw;
        }
    }
}
