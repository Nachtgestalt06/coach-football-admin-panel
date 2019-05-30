import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  foods = [
    {value: 'steak-0', viewValue: 'Equipo 1'},
    {value: 'pizza-1', viewValue: 'Equipo 2'},
    {value: 'tacos-2', viewValue: 'Equipo 3'}
  ];

  positions = [
    {value: 'steak-0', viewValue: 'PT'},
    {value: 'pizza-1', viewValue: 'DF'},
    {value: 'tacos-2', viewValue: 'MC'},
    {value: 'tacos-2', viewValue: 'DL'},
  ];

  form: FormGroup;

  constructor(private newsService: NewsService,
              public dialogRef: MatDialogRef<AddPlayerComponent>,
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

  savePlayer() {
    this.newsService.createNew(this.form.value).subscribe(res => {
      console.log(res);
    });
  }
}
