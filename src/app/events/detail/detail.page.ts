import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    data: any = [];
    dayNamesDe = {
        Monday: 'Montag',
        Tuesday: 'Dienstag',
        Wednesday: 'Mittwoch',
        Thursday: 'Donnerstag',
        Friday: 'Freitag',
        Saturday: 'Samstag',
        Sunday: 'Sonntag'
    };

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        const params = this.route.queryParams;
        params.subscribe(
            next => {
                this.data = this.router.getCurrentNavigation().extras;
            }
        );
    }

}
