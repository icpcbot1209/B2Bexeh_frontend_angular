import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

@NgModule({
  declarations: [AdminComponent, ProductsComponent],
  imports: [CommonModule, AdminRoutingModule, BootstrapModule, HttpClientModule, SharedModule, LayoutContainersModule],
})
export class AdminModule {}
