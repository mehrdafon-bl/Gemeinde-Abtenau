import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject, SQLiteDatabaseConfig} from '@ionic-native/sqlite/ngx';
import {Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';

@Injectable({
    providedIn: 'root'
})
export class SqliteService {
    public db: SQLiteObject;
    public dbConfig: SQLiteDatabaseConfig;

    constructor(
        private sqLite: SQLite,
        private platform: Platform,
        private device: Device
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

        if (this.device.cordova != null && (this.platform.is('android') || this.platform.is('ios'))) {
            this.sqLite.create(this.dbConfig).then((db: SQLiteObject) => {
                /*db.executeSql('DROP TABLE IF EXISTS api_content', [])
                        .then(() => console.log('Drop table if exists content'))
                        .catch(e => console.log(JSON.stringify(e)));*/

                console.log('Database created.');

                db.executeSql('CREATE TABLE IF NOT EXISTS api_content (content_id INTEGER PRIMARY KEY, api_path TEXT, api_data TEXT)')
                    .then(() => {
                    })
                    .catch(e => console.log(e));

                this.db = db;
            }).catch(e => console.log(e));
        }
    }
}
