import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-names-manager',
  templateUrl: './names-manager.component.html',
  styleUrls: ['./names-manager.component.css']
})
export class NamesManagerComponent implements OnInit {
  @Input() oneAtATime = false;
  @Input() allowAdd = false;
  
  @Output() deleteCalled: EventEmitter<string> = new EventEmitter<string>();

  dataUpdater: { [id: string]: BehaviorSubject<boolean>; } = {}
  dataStatus: {[id: string]: boolean} = {}

  constructor() { }

  ngOnInit(): void {
    
  }
  changeStatus(name: string, status: boolean){
    this.dataStatus[name] = status;

    if (this.oneAtATime){
      for (let key in this.dataUpdater){
        if (key != name){
          this.dataUpdater[key].next(false);
        }
      }
    }
  }
  getUpdater(name: string){
    if (!this.dataUpdater[name]){
      this.dataUpdater[name] = new BehaviorSubject<boolean>(false);
    }
    return this.dataUpdater[name];
  }
  onDeleteCalled(name: string){
    this.deleteCalled.emit(name);
  }
}
