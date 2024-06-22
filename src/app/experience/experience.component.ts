import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserState } from '../store/user.reducer';
import { selectUserProfile } from '../store/user.selector';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ExperienceComponent implements OnInit {
  userProfile$: Observable<any | null>;

  constructor(private store: Store<{ user: UserState }>) {
    this.userProfile$ = this.store.pipe(
      select(selectUserProfile),
      map(userProfile => userProfile ? {
        ...userProfile,
        skills: this.filterSkills(JSON.parse(userProfile.skills))
      } : null)
    );
  }

  ngOnInit(): void {}

  private filterSkills(skills: any): any {
    return {
      frontend: skills.frontend.filter((skill: any) => skill.Level),
      backend: skills.backend.filter((skill: any) => skill.Level),
      devops: skills.devops.filter((skill: any) => skill.Level),
      sapTechnical: skills.sapTechnical.filter((skill: any) => skill.Level),
      sapFunctional: skills.sapFunctional.filter((skill: any) => skill.Level)
    };
  }
}
