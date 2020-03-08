import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingMasterComponent } from './meeting-master.component';

describe('MeetingMasterComponent', () => {
  let component: MeetingMasterComponent;
  let fixture: ComponentFixture<MeetingMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
