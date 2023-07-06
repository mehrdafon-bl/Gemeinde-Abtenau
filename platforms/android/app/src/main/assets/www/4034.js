"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4034],{4034:(S,d,s)=>{s.r(d),s.d(d,{OfficialBoardPageModule:()=>E});var f=s(6895),m=s(433),o=s(8434),h=s(1407),p=s(1491),u=s(5698),e=s(8256);function g(t,l){if(1&t){const n=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-item",6),e.\u0275\u0275listener("click",function(){const i=e.\u0275\u0275restoreView(n).$implicit,r=e.\u0275\u0275nextContext(2);return e.\u0275\u0275resetView(r.api.openUrl(i.url))}),e.\u0275\u0275elementStart(1,"ion-label",7)(2,"strong"),e.\u0275\u0275text(3),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"p"),e.\u0275\u0275text(5),e.\u0275\u0275elementEnd()()()}if(2&t){const n=l.$implicit;e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(n.title),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.content)}}function I(t,l){if(1&t&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275elementStart(1,"ion-list"),e.\u0275\u0275template(2,g,6,2,"ion-item",5),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementContainerEnd()),2&t){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("ngForOf",n.boardItems)}}const b=[{path:"",component:(()=>{class t{constructor(n,a){this.api=n,this.sqLite=a,this.boardItems=[],this.boardItemsRaw=[],this.refresherEvent=[]}ngOnInit(){}ionViewDidEnter(){this.getApiData()}getApiData(n=!1){this.sqLite.initDb(),this.api.get("/official-board",!n).subscribe(c=>{this.boardItems=c.data.officialBoard,this.boardItemsRaw=this.boardItems,this.sqLite.db.executeSql("SELECT * FROM api_content WHERE api_path = ?",["official-board"]).then(i=>{i.rows.length>1||i.rows.length<1?this.sqLite.db.executeSql("DELETE FROM api_content WHERE api_path = ?",["official-board"]).then(()=>{this.sqLite.db.executeSql("INSERT INTO api_content (api_path, api_data) VALUES(?,?)",["official-board",JSON.stringify(this.boardItems)]).then(()=>{}).catch(r=>console.log("#insert dberror: "+JSON.stringify(r)))}).catch(r=>console.log("#delete dberror: "+JSON.stringify(r))):this.sqLite.db.executeSql("UPDATE api_content SET api_data = ? WHERE api_path = ?",[JSON.stringify(this.boardItems),"official-board"]).then(()=>{}).catch(r=>console.log("#update dberror: "+JSON.stringify(r)))}).catch(i=>{console.log("#select dberror: "+JSON.stringify(i)),this.sqLite.db.executeSql("INSERT INTO api_content (api_path, api_data) VALUES(?,?)",["official-board",JSON.stringify(this.boardItems)]).then(()=>{}).catch(r=>console.log("#insert dberror: "+JSON.stringify(r)))}),n&&this.refresherEvent.target.complete()},c=>{console.log(c),n&&this.refresherEvent.target.complete(),this.sqLite.db.executeSql("SELECT * FROM api_content WHERE api_path = ?",["official-board"]).then(i=>{for(let r=0;r<i.rows.length;r++)this.boardItems=JSON.parse(i.rows.item(r).api_data),this.boardItemsRaw=this.boardItems}).catch(i=>console.log("#select error: "+JSON.stringify(i)))})}doRefresh(n){this.refresherEvent=n,this.getApiData(!0)}searchItems(n){const a=n.target.value;this.boardItems=this.boardItemsRaw,this.boardItems=a&&""!==a.trim()?this.boardItems.filter(c=>{if(a&&""!==a.trim()){if(c.title.toLowerCase().indexOf(a.toLowerCase())>-1)return!0;if(c.content.toLowerCase().indexOf(a.toLowerCase())>-1)return!0}}):this.boardItemsRaw}}return t.\u0275fac=function(n){return new(n||t)(e.\u0275\u0275directiveInject(p.s),e.\u0275\u0275directiveInject(u.F))},t.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["app-official-board"]],decls:11,vars:2,consts:[[3,"translucent"],["slot","start"],["placeholder","Amtstafel durchsuchen",3,"ionInput"],["slot","fixed",3,"ionRefresh"],[4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"ion-text-wrap"]],template:function(n,a){1&n&&(e.\u0275\u0275elementStart(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.\u0275\u0275element(3,"ion-menu-button"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-title"),e.\u0275\u0275text(5,"Amtstafel"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(6,"ion-searchbar",2),e.\u0275\u0275listener("ionInput",function(i){return a.searchItems(i)}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"ion-content")(8,"ion-refresher",3),e.\u0275\u0275listener("ionRefresh",function(i){return a.doRefresh(i)}),e.\u0275\u0275element(9,"ion-refresher-content"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(10,I,3,1,"ng-container",4),e.\u0275\u0275elementEnd()),2&n&&(e.\u0275\u0275property("translucent",!0),e.\u0275\u0275advance(10),e.\u0275\u0275property("ngIf",a.boardItems))},dependencies:[f.NgForOf,f.NgIf,o.IonButtons,o.IonContent,o.IonHeader,o.IonItem,o.IonLabel,o.IonList,o.IonMenuButton,o.IonRefresher,o.IonRefresherContent,o.IonSearchbar,o.IonTitle,o.IonToolbar,o.TextValueAccessor]}),t})()}];let O=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[h.Bz.forChild(b),h.Bz]}),t})(),E=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[f.CommonModule,m.FormsModule,o.IonicModule,O]}),t})()}}]);