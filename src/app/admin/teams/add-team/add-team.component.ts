import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import swal from 'sweetalert';
import {TeamsService} from '../../services/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  form: FormGroup;

  constructor(private teamService: TeamsService,
              public dialogRef: MatDialogRef<AddTeamComponent>,
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
      equipoId: new FormControl(),
      nombre: new FormControl('', Validators.required),
      logoUrl: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveTeam() {
    if (this.data.option === 'edit') {
      this.teamService.updateTeam(this.form.value, this.form.get('equipoId').value).subscribe(res => {
        console.log(res);
        swal('Exito al actualizar', 'Se ha actualizado con éxito el equipo', 'success');
        this.onNoClick();
      });
    } else {
      this.teamService.createTeam(this.form.value).subscribe(res => {
        console.log(res);
        swal('Exito al guardar', 'Se ha guardado con éxito el equipo', 'success');
        this.onNoClick();
      });
    }
  }
}
