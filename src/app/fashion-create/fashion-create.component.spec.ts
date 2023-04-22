import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionCreateComponent } from './fashion-create.component';

describe('FashionCreateComponent', () => {
  let component: FashionCreateComponent;
  let fixture: ComponentFixture<FashionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
