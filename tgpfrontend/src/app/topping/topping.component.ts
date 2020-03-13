import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ToppingService } from '../services/topping.service';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.scss']
})
export class ToppingComponent implements OnInit {

  @ViewChild('toppForm') toppForm: NgForm;
  public toppingForm: any = {};

  constructor(private dialogRef: MatDialogRef<ToppingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toppingService: ToppingService) { }

  ngOnInit(): void {
    this.mainLoad();
  }

  mainLoad() {
    if (this.data) {
      this.toppingForm = JSON.parse(JSON.stringify(this.data));
      delete this.toppingForm._id;
    }
  }

  async onSubmit() {
    let resp:any;
    if (this.data && this.data._id) {
      resp = await this.toppingService.editTopping(this.data._id, this.toppingForm);
    } else {
      resp = await this.toppingService.addTopping(this.toppingForm);
    }
    this.dialogRef.close({ topping: resp });
  }

  cancel() {
    this.dialogRef.close();
  }

}
