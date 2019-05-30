import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddNewComponent} from '../news/add-new/add-new.component';
import {AddTeamComponent} from './add-team/add-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'description', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialogSave() {
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '250px',
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
