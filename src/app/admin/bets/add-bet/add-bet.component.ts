import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.scss']
})
export class AddBetComponent implements OnInit {

  form: FormGroup;

  constructor(private newsService: NewsService,
              public dialogRef: MatDialogRef<AddBetComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveBet() {
    this.newsService.createNew(this.form.value).subscribe(res => {
      console.log(res);
    });
  }
}
