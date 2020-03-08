import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesManagerComponent } from './names-manager.component';

describe('NamesManagerComponent', () => {
  let component: NamesManagerComponent;
  let fixture: ComponentFixture<NamesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
