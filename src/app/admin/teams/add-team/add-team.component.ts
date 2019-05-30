import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  form: FormGroup;

  constructor(private newsService: NewsService,
              public dialogRef: MatDialogRef<AddTeamComponent>,
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

  saveTeam() {
    this.newsService.createNew(this.form.value).subscribe(res => {
      console.log(res);
    });
  }
}
