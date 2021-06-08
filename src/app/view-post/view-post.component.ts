import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostDataService } from '../services/post-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<void> = new Subject();
  comments: any[];
  title: string;
  body: string;

  constructor(
    private router: Router,
    private postDataService: PostDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title = localStorage.getItem('title');
    this.body = localStorage.getItem('body');
    localStorage.clear();

    this.activatedRoute.params.pipe(takeUntil(this.destroySubject$)).subscribe(params => {
      console.log(params)
      if (!params.postId || !this.body || !this.title) {
        this.router.navigate(['']);
      } else {
        this.postDataService.GetAllPostById(params.postId).subscribe(
          data => {
            this.comments = data;
          },
          error => {
            window.alert(error);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }
}
