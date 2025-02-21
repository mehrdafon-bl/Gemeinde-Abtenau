import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SqliteService } from '../sqlite.service';

@Component({
  selector: 'app-official-board',
  templateUrl: './official-board.page.html',
  styleUrls: ['./official-board.page.scss'],
})
export class OfficialBoardPage implements OnInit {
  boardItems: any = [];
  boardItemsRaw: any = [];
  refresherEvent: any = [];

  constructor(
    public api: ApiService,
    private sqLite: SqliteService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getApiData();
  }

  getApiData(isRefresher = false) {
    this.sqLite.initDb();

    const api = this.api.get('/official-board', isRefresher ? false : true);
    api.subscribe(
      (next) => {
        this.boardItems = next.data.officialBoard;
        this.boardItemsRaw = this.boardItems;

        this.sqLite.db
          .executeSql('SELECT * FROM api_content WHERE api_path = ?', ['official-board'])
          .then((data) => {
            if (data.rows.length > 1 || data.rows.length < 1) {
              this.sqLite.db
                .executeSql('DELETE FROM api_content WHERE api_path = ?', ['official-board'])
                .then(() => {
                  this.sqLite.db
                    .executeSql('INSERT INTO api_content (api_path, api_data) VALUES(?,?)', [
                      'official-board',
                      JSON.stringify(this.boardItems),
                    ])
                    .then(() => {})
                    .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                })
                .catch((ed) => console.log('#delete dberror: ' + JSON.stringify(ed)));
            } else {
              this.sqLite.db
                .executeSql('UPDATE api_content SET api_data = ? WHERE api_path = ?', [
                  JSON.stringify(this.boardItems),
                  'official-board',
                ])
                .then(() => {})
                .catch((eu) => console.log('#update dberror: ' + JSON.stringify(eu)));
            }
          })
          .catch((es) => {
            console.log('#select dberror: ' + JSON.stringify(es));

            this.sqLite.db
              .executeSql('INSERT INTO api_content (api_path, api_data) VALUES(?,?)', [
                'official-board',
                JSON.stringify(this.boardItems),
              ])
              .then(() => {})
              .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
          });

        if (isRefresher) {
          this.refresherEvent.target.complete();
        }
      },
      (error) => {
        console.log(error);

        if (isRefresher) {
          this.refresherEvent.target.complete();
        }

        this.sqLite.db
          .executeSql('SELECT * FROM api_content WHERE api_path = ?', ['official-board'])
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              this.boardItems = JSON.parse(data.rows.item(i).api_data);
              this.boardItemsRaw = this.boardItems;
            }
          })
          .catch((es) => console.log('#select error: ' + JSON.stringify(es)));
      },
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
