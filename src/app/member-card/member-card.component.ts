import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimetablesServiceService } from '../timetables-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() name : string;
  @Input() dataUpdater: Observable<boolean>;
  @Input() deletable: boolean = false;

  @Output() onDataChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  selected: boolean = false;
  

  constructor() { }

  ngOnInit(): void {
    if (this.dataUpdater){
      this.dataUpdater.subscribe((data: boolean) => {
        this.selected = data;
      })
    }
  }
  onSelected(): void{
    this.selected = !this.selected;
    this.onDataChange.emit(this.selected);
  }
  deleteCalled(){
    console.log("onDelete");
    this.onDelete.emit();
  }
}
