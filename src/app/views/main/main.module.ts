import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, BootstrapModule, HttpClientModule, SharedModule, LayoutContainersModule],
})
export class MainModule {}
