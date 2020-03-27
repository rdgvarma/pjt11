import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfeedComponent } from './disfeed.component';

describe('DisfeedComponent', () => {
  let component: DisfeedComponent;
  let fixture: ComponentFixture<DisfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
