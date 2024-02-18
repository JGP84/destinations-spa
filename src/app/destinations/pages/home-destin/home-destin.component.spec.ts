import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestinComponent } from './home-destin.component';

describe('HomeDestinComponent', () => {
  let component: HomeDestinComponent;
  let fixture: ComponentFixture<HomeDestinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDestinComponent]
    });
    fixture = TestBed.createComponent(HomeDestinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
