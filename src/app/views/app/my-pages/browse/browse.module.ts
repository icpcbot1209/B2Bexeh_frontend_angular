import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from './browse.component';

const routes: Routes = [{ path: "", component: BrowseComponent }];

@NgModule({
    declarations: [BrowseComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BrowseModule {}
