import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AdminComponent } from './admin.component';

import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

import { CategoryComponent } from './pages/category/category.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';

import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { EditSubcategoryComponent } from './pages/subcategory/edit-subcategory/edit-subcategory.component';

import { DealmethodComponent } from './pages/dealmethod/dealmethod.component';
import { EditDealmethodComponent } from './pages/dealmethod/edit-dealmethod/edit-dealmethod.component';

import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';

import { BulkUploadProductsComponent } from './pages/products/bulk-upload-products/bulk-upload-products.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { EditTransactionComponent } from './pages/transaction/edit-transaction/edit-transaction.component';

import { SettingComponent } from './pages/setting/setting.component';

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
        path: 'category',
        component: CategoryComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'subcategory',
        component: SubcategoryComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'product',
        component: ProductsComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'dealmethod',
        component: DealmethodComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'setting',
        component: SettingComponent,
        data: { roles: ['admin'] },
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    UsersComponent,
    EditUserComponent,
    CategoryComponent,
    EditCategoryComponent,
    SubcategoryComponent,
    EditSubcategoryComponent,
    EditProductComponent,
    TransactionComponent,
    SettingComponent,
    EditTransactionComponent,
    BulkUploadProductsComponent,
    DealmethodComponent,
    EditDealmethodComponent,
  ],
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
    PerfectScrollbarModule,
  ],
})
export class AdminModule {}
