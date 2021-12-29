import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ClrFormsModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
