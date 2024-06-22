import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserState } from '../store/user.reducer';
import { selectUserProfile } from '../store/user.selector';

@Component({
  selector: 'app-resume',
  templateUrl: 'resume.component.html',
  styleUrls: ['./resume.component.css'], 
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    HttpClientModule
  ]
})
export class ResumeComponent implements OnInit {
  userProfile$: Observable<any | null>;
  pdfSrc: string = '';

  constructor(private store: Store<UserState>) {
    this.userProfile$ = this.store.pipe(select(selectUserProfile));
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(userProfile => {
      if (userProfile && userProfile.resumeUrl) {
        this.pdfSrc = userProfile.resumeUrl;
      }
    });
  }
}
