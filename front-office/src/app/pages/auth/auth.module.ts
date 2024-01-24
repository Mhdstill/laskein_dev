import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CodeConfirmationComponent } from './code-confirmation/code-confirmation.component';
import { TypeNewPasswordComponent } from './type-new-password/type-new-password.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/config/data.service';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'code-confirmation', component: CodeConfirmationComponent },
      { path: 'new-password', component: TypeNewPasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register/:userId', component: RegisterComponent },
    ],
  },
];

@NgModule({
  providers: [DataService, AuthService],
  declarations: [
    LoginComponent,
    AuthComponent,
    ForgotPasswordComponent,
    CodeConfirmationComponent,
    TypeNewPasswordComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
})
export class AuthModule {}
