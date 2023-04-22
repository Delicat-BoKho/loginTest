import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionIndexComponent } from './fashion-index.component';

describe('FashionIndexComponent', () => {
  let component: FashionIndexComponent;
  let fixture: ComponentFixture<FashionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
