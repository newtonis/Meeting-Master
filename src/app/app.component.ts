import { Component } from '@angular/core';
import { PeopleTimetableManagerService } from './people-timetable-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MeetingMaster';
  constructor(private peopleTimeTableService: PeopleTimetableManagerService){
    peopleTimeTableService.startDataHandler("IEEE-Timetable");
  }
}
