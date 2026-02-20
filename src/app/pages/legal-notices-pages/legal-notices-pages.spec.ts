import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticesPages } from './legal-notices-pages';

describe('LegalNoticesPages', () => {
  let component: LegalNoticesPages;
  let fixture: ComponentFixture<LegalNoticesPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticesPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNoticesPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
