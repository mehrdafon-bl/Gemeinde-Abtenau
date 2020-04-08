import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfficialBoardPage } from './official-board.page';

describe('OfficialBoardPage', () => {
  let component: OfficialBoardPage;
  let fixture: ComponentFixture<OfficialBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficialBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
