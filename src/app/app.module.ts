import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { FashionEditComponent } from './fashion-edit/fashion-edit.component';
import { FashionDetailsComponent } from './fashion-details/fashion-details.component';
import { FashionCreateComponent } from './fashion-create/fashion-create.component';
import { HttpClientModule} from '@angular/common/http';
import { FashionIndexComponent } from './fashion-index/fashion-index.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire/compat';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { ProductNewComponent } from './component/product-new/product-new.component'
@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    FashionEditComponent,
    FashionDetailsComponent,
    FashionCreateComponent,
    FashionIndexComponent,
    FileuploadComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent,
    ProductNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
