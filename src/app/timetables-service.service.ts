import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetablesServiceService {
  dataUpdater: { [id: string]: BehaviorSubject<boolean>; } = {}

  dataStatus: {[id: string]: boolean} = {}
  constructor() { }

  updateUserSelection(name: string, selectedStatus: boolean){
    this.dataStatus[name] = selectedStatus;
    
    if (this.dataUpdater[name]){
      this.dataUpdater[name].next(this.dataStatus[name]);
    }
  }
  getDataUpdater(name: string): Observable<boolean>{
    if (!this.dataUpdater[name]){
      this.dataUpdater[name] = new BehaviorSubject<boolean>(false);
    }
    return this.dataUpdater[name].asObservable();
  }
  getDataStatus(name: string): boolean{
    if (!this.dataStatus[name]){
      this.dataStatus[name] = false;
    }
    return this.dataStatus[name];
  }
}
