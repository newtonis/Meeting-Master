import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberCardComponent } from './add-member-card.component';

describe('AddMemberCardComponent', () => {
  let component: AddMemberCardComponent;
  let fixture: ComponentFixture<AddMemberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
