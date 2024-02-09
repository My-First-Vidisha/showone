import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowerComponent } from './shower/shower.component';

const routes: Routes = [

  { path: 'go', component: ShowerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
