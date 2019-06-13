import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import swal from 'sweetalert';
import {BetsService} from '../../services/bets.service';

@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.component.html',
  styleUrls: ['./add-bet.component.scss']
})
export class AddBetComponent implements OnInit {

  form: FormGroup;

  constructor(private betsService: BetsService,
              public dialogRef: MatDialogRef<AddBetComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.initFormGroup();
    if (this.data.option === 'edit') {
      const data = this.data.payload;
      data.fechaInicio = new Date(data.fechaInicio);
      data.fechaFinal = new Date(data.fechaFinal);
      this.form.patchValue(data);
    }
  }

  initFormGroup() {
    this.form = new FormGroup({
      apuestaId: new FormControl(),
      nombre: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFinal: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveBet() {
    if (this.data.option === 'edit') {
      this.betsService.updateBeat(this.form.value, this.form.get('apuestaId').value).subscribe(res => {
        console.log(res);
        swal('Exito al actualizar', 'Se ha actualizado con éxito la apuesta', 'success');
        this.onNoClick();
      });
    } else {
      this.betsService.createBeat(this.form.value).subscribe(res => {
        console.log(res);
        swal('Exito al guardar', 'Se ha guardado con éxito la apuesta', 'success');
        this.onNoClick();
      });
    }
  }
}
