import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  redirectTo: string;

  subs1: Subscription;
  subs2: Subscription;

  ngOnInit(): void {
    this.subs1 = this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (paramMap.has('redirectTo')) {
        this.redirectTo = paramMap.get('redirectTo');
      } else {
        this.redirectTo = null;
      }
    });

    this.subs2 = this.authService.uid$.subscribe((uid) => {
      if (uid) {
        this.router.navigate([this.redirectTo]);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
  }
}
