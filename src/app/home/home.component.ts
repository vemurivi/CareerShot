import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { loadUserProfile } from '../store/user.action';
import { selectUserProfile } from '../store/user.selector';
import { HttpClientModule } from '@angular/common/http';
import { UserState } from '../store/user.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HttpClientModule
  ]
})
export class HomeComponent implements OnInit {
  userProfile$: Observable<any | null>;

  constructor(private route: ActivatedRoute, private store: Store<{ user: UserState }>) {
    this.userProfile$ = this.store.pipe(select(selectUserProfile));
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.store.dispatch(loadUserProfile({ name }));
      }
    });
  }
}
