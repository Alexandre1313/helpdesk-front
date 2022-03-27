import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-called-create',
  templateUrl: './called-create.component.html',
  styleUrls: ['./called-create.component.css']
})
export class CalledCreateComponent implements OnInit {

  title: FormControl = new FormControl(null, [Validators.required]);
  comments: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  fieldsValidators(): boolean {
    return this.title.valid && this.comments.valid &&
    this.client.valid && this.technician.valid &&
    this.status.valid && this.priority.valid;
  }

}
