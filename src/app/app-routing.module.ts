import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'insert/:id',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule),
    //canActivate : [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./cofirm/cofirm.module').then( m => m.CofirmPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'insert-employee/:id',
    loadChildren: () => import('./pages/insert-employee/insert-employee.module').then( m => m.InsertEmployeePageModule)
  },
  {
    path: 'localstorage',
    loadChildren: () => import('./pages/localstorage/localstorage.module').then( m => m.LocalstoragePageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
