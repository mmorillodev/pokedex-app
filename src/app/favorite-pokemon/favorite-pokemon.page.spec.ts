import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritePokemonPage } from './favorite-pokemon.page';

describe('FavoritePokemonPage', () => {
  let component: FavoritePokemonPage;
  let fixture: ComponentFixture<FavoritePokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePokemonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritePokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
