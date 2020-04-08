import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficialDepartmentsPage } from './official-departments.page';

const routes: Routes = [
  {
    path: '',
    component: OfficialDepartmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficialDepartmentsPageRoutingModule {}
