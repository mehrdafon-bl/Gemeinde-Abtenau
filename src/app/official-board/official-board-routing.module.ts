import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficialBoardPage } from './official-board.page';

const routes: Routes = [
  {
    path: '',
    component: OfficialBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficialBoardPageRoutingModule {}
