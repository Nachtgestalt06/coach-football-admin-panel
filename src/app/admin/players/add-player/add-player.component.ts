import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TeamsService} from '../../services/teams.service';
import {Observable} from 'rxjs';
import swal from 'sweetalert';
import {PlayersService} from '../../services/players.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  positions = [
    {value: 'PT', viewValue: 'PT'},
    {value: 'DF', viewValue: 'DF'},
    {value: 'MC', viewValue: 'MC'},
    {value: 'DL', viewValue: 'DL'},
  ];

  teams: Observable<any>;

  form: FormGroup;
  equipos;

  constructor(private playerService: PlayersService,
              private teamsService: TeamsService,
              public dialogRef: MatDialogRef<AddPlayerComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.initFormGroup();
    this.teams = this.teamsService.listTeams();
    if (this.data.option === 'edit') {
      const data = this.data.payload;
      this.form.patchValue(data);
    }
  }

  initFormGroup() {
    this.form = new FormGroup({
      jugadorId: new FormControl(),
      equipoId: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      posicion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      fotoUrl: new FormControl('', Validators.required),
      puntos: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePlayer() {
    if (this.data.option === 'edit') {
      this.playerService.updatePlayer(this.form.value, this.form.get('jugadorId').value).subscribe(res => {
        console.log(res);
        swal('Exito al actualizar', 'Se ha actualizado con éxito el jugador', 'success');
        this.dialogRef.close(this.form.get('equipoId').value);
      });
    } else {
      this.playerService.createPlayer(this.form.value).subscribe(res => {
        console.log(res);
        swal('Exito al guardar', 'Se ha guardado con éxito el jugador', 'success');
        this.dialogRef.close(this.form.get('equipoId').value);
      });
    }
  }
}
