import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddNewComponent} from './add-new/add-new.component';
import {NewsService} from '../services/news.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'description', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, private newsService: NewsService) {
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.listNews().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });
  }

  openDialogSave(option, payload?) {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '350px',
      data: {
        option: option,
        payload: null || payload
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNews();
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteNew(item) {
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
            this.newsService.deleteNew(item.noticiaId)
              .subscribe((res: any) => {
                console.log(res);
                swal('Exito al eliminar', res, 'success');
                this.loadNews();
              },
                () => swal('Algo salio mal', 'No se ha podido eliminar esta noticia', 'error'));
          }
        }
      );
  }

}
