import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class SqliteService {
    public db: SQLiteObject;

    constructor(private sqlite: SQLite) {
        this.sqlite.create({
            name: 'abtenau.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            /*db.executeSql('DROP TABLE IF EXISTS api_content', [])
                .then(() => console.log('Drop table if exists content'))
                .catch(e => console.log(JSON.stringify(e)));*/

            db.executeSql('CREATE TABLE IF NOT EXISTS api_content (content_id INTEGER PRIMARY KEY, api_path TEXT, api_data TEXT)')
                .then(() => {
                })
                .catch(e => console.log(e));

            this.db = db;
        }).catch(e => console.log(e));
    }
}
