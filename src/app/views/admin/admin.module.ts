import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'user',
        component: UsersComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'product',
        component: ProductsComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, ProductsComponent, UsersComponent, EditUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    HttpClientModule,
    SharedModule,
    LayoutContainersModule,
    ComponentsStateButtonModule,
    MaterialModule,
  ],
})
export class AdminModule {}
