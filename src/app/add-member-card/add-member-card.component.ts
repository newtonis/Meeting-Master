import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-member-card',
  templateUrl: './add-member-card.component.html',
  styleUrls: ['./add-member-card.component.css']
})
export class AddMemberCardComponent implements OnInit {
  @Output() onAddPerson: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  addPerson(name: string){
    console.log(`add person ${name}`);
    this.onAddPerson.emit(name);
  }
}
