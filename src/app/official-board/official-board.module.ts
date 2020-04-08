import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficialBoardPageRoutingModule } from './official-board-routing.module';

import { OfficialBoardPage } from './official-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficialBoardPageRoutingModule
  ],
  declarations: [OfficialBoardPage]
})
export class OfficialBoardPageModule {}
