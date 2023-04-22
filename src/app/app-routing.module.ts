import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionCreateComponent } from './fashion-create/fashion-create.component';
import { FashionDetailsComponent } from './fashion-details/fashion-details.component';
import { FashionEditComponent } from './fashion-edit/fashion-edit.component';
import { FashionIndexComponent } from './fashion-index/fashion-index.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { ProductNewComponent } from './component/product-new/product-new.component';

const routes: Routes = [
  {
    path: 'fashion',
    component: FashionIndexComponent,
  },
  {
    path: 'fashionEdit/:id',
    component: FashionEditComponent,
  },
  {
    path: 'fashionDetails/:id',
    component: FashionDetailsComponent,
  },
  {
    path: 'fashionCreate',
    component: FashionCreateComponent,
  },
  {
    path: 'fileupload',
    component: FileuploadComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '', redirectTo:'fileupload', pathMatch:'full'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'varify-email',
    component: VarifyEmailComponent,
  },
  {
    path: 'productnew',
    component: ProductNewComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent=[]
