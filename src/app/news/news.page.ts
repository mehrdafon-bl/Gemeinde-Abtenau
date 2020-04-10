import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    newsItems: any = [];
    refresherEvent: any = [];
    firstLoad = true;

    constructor(private api: ApiService, private router: Router) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        if (this.firstLoad === true) {
            this.getApiData();
        }

        this.firstLoad = false;
    }

    getApiData(isRefresher = false) {
        const api = this.api.get('/news', isRefresher ? false : true);
        api.subscribe(
            next => {
                this.newsItems = next.data.news;

                if (isRefresher) {
                    this.refresherEvent.target.complete();
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    showDetail(data) {
        const dataSend: NavigationExtras = data;
        this.router.navigate(['/news/detail'], dataSend);
    }

    doRefresh(event) {
        this.refresherEvent = event;
        this.getApiData(true);
    }
}
