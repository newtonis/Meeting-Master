import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  selected: string;
  name: string;
}

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  @Input() name;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }
  onSiClick(){
    this.data.selected = "Si";
    this.dialogRef.close(this.data);
  }
  onNoClick(){
    this.data.selected = "No";
    this.dialogRef.close(this.data);
  }
}
