import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  form: FormGroup;

  constructor(private newsService: NewsService,
              public dialogRef: MatDialogRef<AddNewComponent>,
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

  saveNew() {
    this.newsService.createNew(this.form.value).subscribe(res => {
      console.log(res);
    });
  }

}
