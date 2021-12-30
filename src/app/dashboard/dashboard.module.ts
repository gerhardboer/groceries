import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ClrFormsModule,
    FormsModule,
    ClarityModule,
    provideFirestore(() => getFirestore()),
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
