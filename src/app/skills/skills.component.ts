import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../services/user-state.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  standalone:true,
  imports:[CommonModule, HttpClientModule],
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: any = {};

  constructor(private userStateService: UserStateService) {}

  ngOnInit(): void {
    const userProfile = this.userStateService.getUserProfile();
    if (userProfile) {
      this.skills = JSON.parse(userProfile.Skills);
    } else {
      console.error('User profile not found in state.');
    }
  }
}
