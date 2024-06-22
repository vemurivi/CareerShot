import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import { selectUserProfile } from '../store/user.selector';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string ='';

  constructor(private store: Store<{ user: UserState }>) {}

  ngOnInit(): void {
    this.store.select(selectUserProfile).subscribe(userProfile => {
      if (userProfile) {
        this.userName = userProfile.name;
      }
    });
  }
}
