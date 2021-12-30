import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClrFormsModule, ClrIconModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ClrFormsModule, FormsModule, ClrIconModule],
})
export class DashboardModule {}
