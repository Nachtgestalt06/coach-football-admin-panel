import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddPlayerComponent} from './add-player/add-player.component';
import {Observable} from 'rxjs';
import {TeamsService} from '../services/teams.service';
import {PlayersService} from '../services/players.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['foto', 'nombre', 'posicion', 'precio', 'puntos', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  teams: Observable<any>;
  teamId;
  constructor(public dialog: MatDialog,
              private playersService: PlayersService,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.teams = this.teamsService.listTeams();
  }

  loadPlayers(event) {
    this.teamId = event;
    console.log('Team id: ', event);
    console.log(event);
    this.playersService.listPlayers(event)
      .subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
        error => this.dataSource = new MatTableDataSource()
    );
  }

  openDialogSave(option, payload?) {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '450px',
      data: {
        option: option,
        payload: null || payload
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.loadPlayers(result);
    });
  }

  deletePlayer(item) {
    const options = {
      text: '¿Estas seguro de eliminar este jugador?',
      buttons: {
        cancel: {
          text: 'Cancelar',
          closeModal: true,
          value: false,
          visible: true
        },
        confirm: {
          text: 'Aceptar',
          value: true,
        }
      }
    };
    swal(options)
      .then((willDelete) => {
          if (willDelete) {
            this.playersService.deletePlayer(item.jugadorId)
              .subscribe((res: any) => {
                  console.log(res);
                  swal('Exito al eliminar', res, 'success');
                  this.loadPlayers(this.teamId);
                },
                () => swal('Algo salio mal', 'No se ha podido eliminar este jugador', 'error'));
          }
        }
      );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
