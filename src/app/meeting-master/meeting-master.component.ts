import { Component, OnInit } from '@angular/core';
import { TimetablesServiceService } from '../timetables-service.service';
import { PeopleTimetableManagerService } from '../people-timetable-manager.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Person, Timeblock } from '../materia';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-meeting-master',
  templateUrl: './meeting-master.component.html',
  styleUrls: ['./meeting-master.component.css']
})
export class MeetingMasterComponent implements OnInit {
  dataProvider: Observable<Person[]>;
  timeblockIntersectionUpdater: BehaviorSubject<Timeblock[]> = new BehaviorSubject<Timeblock[]>([]);

  tableTimeblockUpdater: BehaviorSubject<Timeblock[]> = new BehaviorSubject<Timeblock[]>([]);
  selected: string = "";
  selectedBlocks: Timeblock[] = [];
  disable: number = -1;
  disableUpdating: boolean = false;
  
  userByName: {[name: string] : Person; } = {};

  constructor(public peopleTimeTableManager: PeopleTimetableManagerService) { 
    this.dataProvider = peopleTimeTableManager.getDataObservable();
    this.dataProvider.subscribe((data : Person[]) => {

      for (var person in data){
        if (!this.userByName[data[person].name]){
          this.userByName[data[person].name] = data[person];
        }
      }

      this.selected = "";
    })
  }

  ngOnInit(): void {
  }
  addPerson(name: string){
 
    console.log(`add person ${name}`);
    this.peopleTimeTableManager.addPerson(name);

  }
  removePerson(name: string){
    console.log(`remove person ${name}`);
    this.peopleTimeTableManager.removePerson(name);
  }
  updateCalendarContent(selected: string){
    this.selected = selected;
    if (selected == ""){
      this.tableTimeblockUpdater.next([]);
      this.selected = "";
    }else{
      
      this.tableTimeblockUpdater.next(this.userByName[selected].timetable);
    }
  }
  updatedCalendarFromUser(blocks: Timeblock[]){

    if (this.selected == ""){
      this.tableTimeblockUpdater.next([]);
    }else{
      this.selectedBlocks = blocks;
      this.userByName[this.selected].timetable = blocks;
    }
    
  }
  updateAll(){

    for (let key in this.userByName){
      let value: Person = this.userByName[key];
      this.peopleTimeTableManager.updatePerson(
        value.name,
        value.timetable
      );

    }
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent){
    if (tabChangeEvent.index != 1){
      this.disableUpdating = true;
      console.log("updating changes of db");
      this.updateAll();
    }
    /*else{
      console.log("erasing all");

    }*/
  }

}
