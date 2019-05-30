import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddBetComponent} from './add-bet/add-bet.component';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'description', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialogSave() {
    const dialogRef = this.dialog.open(AddBetComponent, {
      width: '30vw',
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
