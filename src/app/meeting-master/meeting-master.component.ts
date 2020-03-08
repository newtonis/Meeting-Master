import { Component, OnInit } from '@angular/core';
import { TimetablesServiceService } from '../timetables-service.service';

@Component({
  selector: 'app-meeting-master',
  templateUrl: './meeting-master.component.html',
  styleUrls: ['./meeting-master.component.css']
})
export class MeetingMasterComponent implements OnInit {

  constructor(public timeTablesService: TimetablesServiceService) { }

  ngOnInit(): void {
  }

}
