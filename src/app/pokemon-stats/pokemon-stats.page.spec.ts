import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonStatsPage } from './pokemon-stats.page';

describe('PokemonStatsPage', () => {
  let component: PokemonStatsPage;
  let fixture: ComponentFixture<PokemonStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
