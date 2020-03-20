import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PessoasService} from './pages/services/PessoasService';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { RegisterVaccineComponent } from './pages/register-vaccine/register-vaccine.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RegisterVaccineComponent
  ],
  providers: [
    PessoasService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
