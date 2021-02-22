import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
];

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MaterialModule, ComponentsStateButtonModule],
})
export class AuthModule {}
