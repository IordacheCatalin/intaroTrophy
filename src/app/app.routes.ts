import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    {path: '',component: HomeComponent,},
    {path: 'home',component: HomeComponent,},
];
