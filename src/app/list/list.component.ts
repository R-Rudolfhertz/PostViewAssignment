import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostDataService } from '../services/post-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['userId', 'title', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private postDataService: PostDataService
  ) {}

  ngAfterViewInit() {
    this.postDataService.GetAllPosts().pipe(takeUntil(this.destroySubject$)).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        window.alert(error);
      });
  }

  ViewPost(e) {
    localStorage.clear();
    localStorage.setItem('title', e.title);
    localStorage.setItem('body', e.body);
    this.router.navigate(['/view/'+ e.id]);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }
}