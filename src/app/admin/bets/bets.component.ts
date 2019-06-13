import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddBetComponent} from './add-bet/add-bet.component';
import {BetsService} from '../services/bets.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'fecha_inicial', 'fecha_final', 'status', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(private betsService: BetsService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.betsService.listBeats().subscribe(
      res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      }
    );
  }

  openDialogSave(option, payload?) {
    const dialogRef = this.dialog.open(AddBetComponent, {
      width: '30vw',
      data: {
        option: option,
        payload: null || payload
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
      console.log('The dialog was closed');
    });
  }

  deleteTeam(item) {
    const options = {
      text: '¿Estas seguro de eliminar esta apuesta?',
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
            this.betsService.deleteBeat(item.apuestaId)
              .subscribe((res: any) => {
                  console.log(res);
                  swal('Exito al eliminar', res, 'success');
                  this.loadData();
                },
                () => swal('Algo salio mal', 'No se ha podido eliminar esta apuesta', 'error'));
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
