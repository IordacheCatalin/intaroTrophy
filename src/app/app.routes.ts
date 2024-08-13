import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { HomeComponent } from './Pages/home/home.component';
import { ProgramComponent } from './Pages/program/program.component.';
import { PartnersComponent } from './Pages/partners/partners.component';

export const routes: Routes = [
    {path: '',component: HomeComponent,},
    {path: 'home',component: HomeComponent,},
    {path: 'results',component: ProgramComponent,},
    {path: 'program',component: ProgramComponent,},
    {path: 'partners',component: PartnersComponent,},
];
