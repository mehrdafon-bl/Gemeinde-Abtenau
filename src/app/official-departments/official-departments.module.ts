import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficialDepartmentsPageRoutingModule } from './official-departments-routing.module';

import { OfficialDepartmentsPage } from './official-departments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficialDepartmentsPageRoutingModule
  ],
  declarations: [OfficialDepartmentsPage]
})
export class OfficialDepartmentsPageModule {}
