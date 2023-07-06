"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1416],{1416:(x,m,i)=>{i.r(m),i.d(m,{NewsPageModule:()=>I});var d=i(6895),p=i(433),o=i(8434),g=i(1407),h=i(1491),f=i(5698),e=i(8256);function _(n,a){if(1&n&&e.\u0275\u0275element(0,"img",13),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275property("src",t.images[0],e.\u0275\u0275sanitizeUrl)}}function u(n,a){if(1&n&&(e.\u0275\u0275elementStart(0,"ion-card-subtitle"),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"date"),e.\u0275\u0275elementEnd()),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind2(2,1,1e3*t.published,"dd.MM.yyyy"))}}function w(n,a){if(1&n&&(e.\u0275\u0275elementStart(0,"ion-card-title")(1,"h4"),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd()()),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.title)}}function C(n,a){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-col",9)(1,"ion-card",10),e.\u0275\u0275listener("click",function(){const c=e.\u0275\u0275restoreView(t).$implicit,r=e.\u0275\u0275nextContext(2);return e.\u0275\u0275resetView(r.showDetail(c))}),e.\u0275\u0275template(2,_,1,1,"img",11),e.\u0275\u0275elementStart(3,"ion-card-header"),e.\u0275\u0275template(4,u,3,4,"ion-card-subtitle",6),e.\u0275\u0275template(5,w,3,1,"ion-card-title",6),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"ion-card-content"),e.\u0275\u0275element(7,"div",12),e.\u0275\u0275elementEnd()()()}if(2&n){const t=a.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",t.images.length>0),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",t.published),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",""!=t.title),e.\u0275\u0275advance(2),e.\u0275\u0275property("innerHTML",t.shortContent,e.\u0275\u0275sanitizeHtml)}}function M(n,a){if(1&n&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275elementStart(1,"ion-row",7),e.\u0275\u0275template(2,C,8,4,"ion-col",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementContainerEnd()),2&n){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("ngForOf",t.newsItems)}}const P=[{path:"",component:(()=>{class n{constructor(t,s,l){this.api=t,this.router=s,this.sqLite=l,this.newsItems=[],this.refresherEvent=[],this.firstLoad=!0}ngOnInit(){}ionViewDidEnter(){!0===this.firstLoad&&this.getApiData(),this.firstLoad=!1}getApiData(t=!1){this.sqLite.initDb(),this.api.get("/news",!t).subscribe(l=>{this.newsItems=l.data.news,this.newsItems.length>0?this.sqLite.db.executeSql("SELECT * FROM api_content WHERE api_path = ?",["news"]).then(c=>{c.rows.length>1||c.rows.length<1?this.sqLite.db.executeSql("DELETE FROM api_content WHERE api_path = ?",["news"]).then(()=>{this.sqLite.db.executeSql("INSERT INTO api_content (api_path, api_data) VALUES(?,?)",["news",JSON.stringify(this.newsItems)]).then(()=>{}).catch(r=>console.log("#insert dberror: "+JSON.stringify(r)))}).catch(r=>console.log("#delete dberror: "+JSON.stringify(r))):this.sqLite.db.executeSql("UPDATE api_content SET api_data = ? WHERE api_path = ?",[JSON.stringify(this.newsItems),"news"]).then(()=>{}).catch(r=>console.log("#update dberror: "+JSON.stringify(r)))}).catch(c=>{console.log("#select dberror: "+JSON.stringify(c)),this.sqLite.db.executeSql("INSERT INTO api_content (api_path, api_data) VALUES(?,?)",["news",JSON.stringify(this.newsItems)]).then(()=>{}).catch(r=>console.log("#insert dberror: "+JSON.stringify(r)))}):this.getDataFromDb(),t&&this.refresherEvent.target.complete()},l=>{console.log(l),t&&this.refresherEvent.target.complete(),this.getDataFromDb()}),setTimeout(()=>{0===this.newsItems.length&&this.getDataFromDb()},4e3)}showDetail(t){this.router.navigate(["/news/detail"],t)}doRefresh(t){this.refresherEvent=t,this.getApiData(!0)}getDataFromDb(){this.sqLite.db.executeSql("SELECT * FROM api_content WHERE api_path = ?",["news"]).then(t=>{for(let s=0;s<t.rows.length;s++)this.newsItems=JSON.parse(t.rows.item(s).api_data)}).catch(t=>console.log("#select error: "+JSON.stringify(t)))}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275directiveInject(h.s),e.\u0275\u0275directiveInject(g.F0),e.\u0275\u0275directiveInject(f.F))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-news"]],decls:17,vars:2,consts:[[3,"translucent"],["slot","start"],[1,"welcome","ion-padding"],["src","/assets/logo_website.png",1,"logo"],["src","/assets/logo_website_dark.png",1,"logo","dark"],["slot","fixed",3,"ionRefresh"],[4,"ngIf"],[1,"news-items-container"],["size","12","size-md","6","class","ion-no-padding",4,"ngFor","ngForOf"],["size","12","size-md","6",1,"ion-no-padding"],[1,"detail-page-card",3,"click"],[3,"src",4,"ngIf"],[3,"innerHTML"],[3,"src"]],template:function(t,s){1&t&&(e.\u0275\u0275elementStart(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.\u0275\u0275element(3,"ion-menu-button"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-title"),e.\u0275\u0275text(5,"Aktuelles"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(6,"ion-content")(7,"div",2),e.\u0275\u0275element(8,"img",3)(9,"img",4),e.\u0275\u0275elementStart(10,"h1"),e.\u0275\u0275text(11,"Herzlich Willkommen"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(12,"p"),e.\u0275\u0275text(13,"in der App der Marktgemeinde Abtenau."),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(14,"ion-refresher",5),e.\u0275\u0275listener("ionRefresh",function(c){return s.doRefresh(c)}),e.\u0275\u0275element(15,"ion-refresher-content"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(16,M,3,1,"ng-container",6),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275property("translucent",!0),e.\u0275\u0275advance(16),e.\u0275\u0275property("ngIf",s.newsItems))},dependencies:[d.NgForOf,d.NgIf,o.IonButtons,o.IonCard,o.IonCardContent,o.IonCardHeader,o.IonCardSubtitle,o.IonCardTitle,o.IonCol,o.IonContent,o.IonHeader,o.IonMenuButton,o.IonRefresher,o.IonRefresherContent,o.IonRow,o.IonTitle,o.IonToolbar,d.DatePipe],styles:[".welcome[_ngcontent-%COMP%]{text-align:center;border-bottom:1px solid var(--ion-color-light-shade);margin:15px}.welcome[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:85%;height:auto}.welcome[_ngcontent-%COMP%]   .logo.dark[_ngcontent-%COMP%]{display:none}.news-items-container[_ngcontent-%COMP%]   ion-col.ios[_ngcontent-%COMP%]{padding-bottom:16px}.news-items-container[_ngcontent-%COMP%]   ion-col.md[_ngcontent-%COMP%]{padding-bottom:10px}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .detail-page-card.ios[_ngcontent-%COMP%]{height:100%}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .detail-page-card.md[_ngcontent-%COMP%]{height:100%}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .detail-page-card[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%;height:auto}@media (prefers-color-scheme: dark){.welcome[_ngcontent-%COMP%]{text-align:center;border-bottom:1px solid var(--ion-color-light-shade);margin:15px}.welcome[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:none}.welcome[_ngcontent-%COMP%]   .logo.dark[_ngcontent-%COMP%]{display:inline-block}}@media (min-width: 768px){.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(odd)   .detail-page-card.ios[_ngcontent-%COMP%]{margin-right:8px}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(odd)   .detail-page-card.md[_ngcontent-%COMP%]{margin-right:5px}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(even)   .detail-page-card.ios[_ngcontent-%COMP%]{margin-left:8px}.news-items-container[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(even)   .detail-page-card.md[_ngcontent-%COMP%]{margin-left:5px}}"]}),n})()},{path:"detail",loadChildren:()=>i.e(6613).then(i.bind(i,6613)).then(n=>n.DetailPageModule)}];let O=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[g.Bz.forChild(P),g.Bz]}),n})(),I=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[d.CommonModule,p.FormsModule,o.IonicModule,O]}),n})()}}]);