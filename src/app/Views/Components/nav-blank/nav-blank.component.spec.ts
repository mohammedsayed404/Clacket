/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavBlankComponent } from './nav-blank.component';

describe('NavBlankComponent', () => {
  let component: NavBlankComponent;
  let fixture: ComponentFixture<NavBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
