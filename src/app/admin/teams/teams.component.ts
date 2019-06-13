import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddNewComponent} from '../news/add-new/add-new.component';
import {AddTeamComponent} from './add-team/add-team.component';
import {TeamsService} from '../services/teams.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'image', 'description', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(public dialog: MatDialog,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamsService.listTeams().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });
  }

  openDialogSave(option, payload?) {
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '350px',
      data: {
        option: option,
        payload: null || payload
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTeams();
      console.log('The dialog was closed');
    });
  }

  deleteTeam(item) {
    const options = {
      text: '¿Estas seguro de eliminar esta noticia?',
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
            this.teamsService.deleteTeam(item.equipoId)
              .subscribe((res: any) => {
                  console.log(res);
                  swal('Exito al eliminar', res, 'success');
                  this.loadTeams();
                },
                () => swal('Algo salio mal', 'No se ha podido eliminar esta noticia', 'error'));
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
