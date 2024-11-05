import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BookInventoryComponent } from './components/admin-dashboard/book-inventory/book-inventory.component';
import { AddAdminComponent } from './components/admin-dashboard/add-admin/add-admin.component';
import { RegisterStudentComponent } from './components/admin-dashboard/register-student/register-student.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'dashboard/inventory',
        component: BookInventoryComponent,
        canActivate: [authGuard]

    },
    {
        path: 'dashboard/addAdmin',
        component: AddAdminComponent,
        canActivate: [authGuard]

    },
    {
        path: 'dashboard/regStudent',
        component: RegisterStudentComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
