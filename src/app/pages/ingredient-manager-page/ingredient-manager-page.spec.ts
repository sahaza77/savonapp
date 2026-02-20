import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientManagerPage } from './ingredient-manager-page';

describe('IngredientManagerPage', () => {
  let component: IngredientManagerPage;
  let fixture: ComponentFixture<IngredientManagerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientManagerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
