import { Component, OnInit } from '@angular/core';
import { PeopleTimetableManagerService } from '../people-timetable-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private peopleTimeTableService: PeopleTimetableManagerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("init on param");
    console.log(this.route.snapshot.paramMap.get('id'));

    this.peopleTimeTableService.startDataHandler(this.route.snapshot.paramMap.get('id'));

  }

}
