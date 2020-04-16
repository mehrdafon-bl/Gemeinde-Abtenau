import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    data: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        const params = this.route.queryParams;
        params.subscribe(
            next => {
                this.data = this.router.getCurrentNavigation().extras;
            }
        );
    }

    ionViewDidEnter() {
        const allLinks = document.querySelectorAll('a');

        for (let i = 0; i < allLinks.length; i++) {

            this.renderer.listen(allLinks.item(i), 'click', (event) => {
                if (event.target.href.indexOf(this.api.websiteUrl) > -1) {
                    this.api.openUrl(event.target.href);

                    return false;
                } else {
                    return true;
                }
            });

        }
    }

}
