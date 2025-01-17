import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject, SQLiteDatabaseConfig} from '@awesome-cordova-plugins/sqlite/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SqliteService {
    public db: SQLiteObject;
    public dbConfig: SQLiteDatabaseConfig;

    constructor(
        private sqLite: SQLite,
        private platform: Platform
    ) {

    }

    initDb() {
        if (this.platform.is('android')) {
            this.dbConfig = {
                name: 'abtenau.db',
                location: 'default'
            };
        } else {
            this.dbConfig = {
                name: 'abtenau.db',
                iosDatabaseLocation: 'Library'
            };
        }

        if (this.platform.is('android') || this.platform.is('ios')) {
            this.sqLite.create(this.dbConfig).then((db: SQLiteObject) => {
                /*db.executeSql('DROP TABLE IF EXISTS api_content', [])
                        .then(() => console.log('Drop table if exists content'))
                        .catch(e => console.log(JSON.stringify(e)));*/

                console.log('Database created.');

                if (db) {
                    db.executeSql('CREATE TABLE IF NOT EXISTS api_content (content_id INTEGER PRIMARY KEY, api_path TEXT, api_data TEXT)')
                        .then(() => {
                        })
                        .catch(e => console.log(e));
    
                    this.db = db;
                }
            }).catch(e => console.log(e));
        }
    }
}
