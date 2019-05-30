import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddNewComponent} from '../news/add-new/add-new.component';
import {AddPlayerComponent} from './add-player/add-player.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'description', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialogSave() {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
