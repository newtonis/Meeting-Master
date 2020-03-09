import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Person } from '../materia';

@Component({
  selector: 'app-names-manager',
  templateUrl: './names-manager.component.html',
  styleUrls: ['./names-manager.component.css']
})
export class NamesManagerComponent implements OnInit {
  @Input() oneAtATime = false;
  @Input() allowAdd = false;
  @Input() dataProvider: Observable<Person[]>;

  @Output() deleteCalled: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCalled: EventEmitter<string> = new EventEmitter<string>();
  @Output() newSelectedItem: EventEmitter<string> = new EventEmitter<string>();

  dataUpdater: { [id: string]: BehaviorSubject<boolean>; } = {}
  dataStatus: {[id: string]: boolean} = {}

  constructor() { }

  ngOnInit(): void {
    /*this.dataProvider.subscribe(data=>{
      console.log(`new data`);
      console.log(data);
    });*/
  }
  changeStatus(name: string, status: boolean){
    if (this.oneAtATime){
      for (let key in this.dataUpdater){
        if (key != name){
          this.dataUpdater[key].next(false);
        }
      }
    }

    this.dataStatus[name] = status;
    if (status == true){
      this.newSelectedItem.emit(name);
    }
    
  }
  addPerson(name: string){
    this.dataStatus[name] = false;
    console.log(`add person ${name}`);
    this.addCalled.emit(name);
  }
  deletePerson(name: string){
    console.log(`delete ${name}`);
    this.deleteCalled.emit(name);
  }
  getUpdater(name: string){
    if (!this.dataUpdater[name]){
      this.dataUpdater[name] = new BehaviorSubject<boolean>(false);
    }
    return this.dataUpdater[name];
  }
}
