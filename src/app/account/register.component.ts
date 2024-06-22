import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule
  ]
})
export class RegisterComponent {
  form: FormGroup;
  photoFile: File | null = null;
  resumeFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photo: [null, Validators.required],
      resume: [null, Validators.required],
      linkedin: [''],
      github: [''],
      skills: this.fb.group({
        frontend: this.fb.array(this.initFrontendSkills()),
        backend: this.fb.array(this.initBackendSkills()),
        devops: this.fb.array(this.initDevopsSkills()),
        sapTechnical: this.fb.array(this.initSapTechnicalSkills()),
        sapFunctional: this.fb.array(this.initSapFunctionalSkills())
      })
    });
  }

  initFrontendSkills() {
    return [
      this.fb.group({ name: 'HTML', level: [''] }),
      this.fb.group({ name: 'CSS', level: [''] }),
      this.fb.group({ name: 'JavaScript', level: [''] }),
      this.fb.group({ name: 'Vue.js', level: [''] }),
      this.fb.group({ name: 'Angular', level: [''] }),
      this.fb.group({ name: 'React', level: [''] })
    ];
  }

  initBackendSkills() {
    return [
      this.fb.group({ name: 'Java', level: [''] }),
      this.fb.group({ name: 'Python', level: [''] }),
      this.fb.group({ name: 'Node.js', level: [''] }),
      this.fb.group({ name: '.NET Framework', level: [''] }),
      this.fb.group({ name: 'ASP.NET', level: [''] }),
      this.fb.group({ name: 'REST API', level: [''] }),
      this.fb.group({ name: 'Azure', level: [''] }),
      this.fb.group({ name: 'Oracle DB', level: [''] }),
      this.fb.group({ name: 'TSQL', level: [''] }),
      this.fb.group({ name: 'MySQL', level: [''] }),
      this.fb.group({ name: 'PostgreSQL', level: [''] })
    ];
  }

  initDevopsSkills() {
    return [
      this.fb.group({ name: 'Azure DevOps', level: [''] }),
      this.fb.group({ name: 'AWS DevOps', level: [''] }),
      this.fb.group({ name: 'Google DevOps', level: [''] }),
      this.fb.group({ name: 'GitHub', level: [''] }),
      this.fb.group({ name: 'Jenkins', level: [''] }),
      this.fb.group({ name: 'TeamCity', level: [''] }),
      this.fb.group({ name: 'BuildMaster', level: [''] }),
      this.fb.group({ name: 'Google Cloud', level: [''] }),
      this.fb.group({ name: 'Oracle Cloud', level: [''] })
    ];
  }

  initSapTechnicalSkills() {
    return [
      this.fb.group({ name: 'ABAP', level: [''] }),
      this.fb.group({ name: 'BASIS', level: [''] }),
      this.fb.group({ name: 'PI', level: [''] }),
      this.fb.group({ name: 'Master Data Governance', level: [''] }),
      this.fb.group({ name: 'SAP SECURITY', level: [''] })
    ];
  }

  initSapFunctionalSkills() {
    return [
      this.fb.group({ name: 'Finance Module', level: [''] }),
      this.fb.group({ name: 'Control Module', level: [''] }),
      this.fb.group({ name: 'Material Management', level: [''] }),
      this.fb.group({ name: 'Sales and Distribution', level: [''] }),
      this.fb.group({ name: 'Joint Venture Accounting', level: [''] }),
      this.fb.group({ name: 'Human Resource', level: [''] })
    ];
  }

  get frontendSkills() {
    return this.form.get('skills.frontend') as FormArray;
  }

  get backendSkills() {
    return this.form.get('skills.backend') as FormArray;
  }

  get devopsSkills() {
    return this.form.get('skills.devops') as FormArray;
  }

  get sapTechnicalSkills() {
    return this.form.get('skills.sapTechnical') as FormArray;
  }

  get sapFunctionalSkills() {
    return this.form.get('skills.sapFunctional') as FormArray;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (controlName === 'photo') {
      this.photoFile = file;
      this.form.patchValue({ photo: file });
    } else if (controlName === 'resume') {
      this.resumeFile = file;
      this.form.patchValue({ resume: file });
    }
  }

  async onSubmit() {
    // Trigger form validation
    this.form.markAllAsTouched();
    
    if (this.form.invalid) {
      this.snackBar.open('Please fill all required fields and provide valid files.', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.form.value;
    const combinedFormData = new FormData();
    combinedFormData.append('jsonData', JSON.stringify(formData));

    if (this.photoFile) {
      combinedFormData.append('photo', this.photoFile);
    }
    if (this.resumeFile) {
      combinedFormData.append('resume', this.resumeFile);
    }

    try {
      // Save text data and upload files to the backend using ApiService
      await firstValueFrom(this.apiService.postFormData('register', combinedFormData));

      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
      this.router.navigate(['/home'], { queryParams: { name: formData.name } });
    } catch (error) {
      console.error('Error submitting form:', error);
      this.snackBar.open('Error submitting form. Please try again.', 'Close', { duration: 3000 });
    }
  }
}
