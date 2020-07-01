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
            let el: any;
            this.renderer.listen(allLinks.item(i), 'click', (event) => {
                el = event.target;

                if (typeof el.href === 'undefined') {
                    event.path.forEach((val, key) => {
                        if (typeof val.href !== 'undefined') {
                            el = val;
                        }
                    });
                }

                if (el.href.indexOf('mailto:') === -1 && el.href.indexOf('tel:') === -1) {
                    this.api.openUrl(el.href);

                    return false;
                }
            });

        }
    }

}
