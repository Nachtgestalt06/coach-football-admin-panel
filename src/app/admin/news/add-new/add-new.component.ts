import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import swal from 'sweetalert';

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
    if (this.data.option === 'edit') {
      const data = this.data.payload;
      this.form.patchValue(data);
    }

  }

  initFormGroup() {
    this.form = new FormGroup({
      noticiaId: new FormControl(),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveNew() {
    if (this.data.option === 'edit') {
      this.newsService.updateNew(this.form.value, this.form.get('noticiaId').value).subscribe(res => {
        console.log(res);
        swal('Exito al actualizar', 'Se ha actualizado con éxito la noticia', 'success');
        this.onNoClick();
      });
    } else {
      this.newsService.createNew(this.form.value).subscribe(res => {
        console.log(res);
        swal('Exito al guardar', 'Se ha guardado con éxito la noticia', 'success');
        this.onNoClick();
      });
    }
  }

}
