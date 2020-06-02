import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {PessoasService} from './pages/services/pessoas.service';
import {VacinaService} from './pages/services/vacina.service';
import {AuthGuard} from './pages/guards/auth-guard';
import {LoginService} from './pages/services/login.service';
import { CampanhaComponent } from './pages/campanha/campanha.component';
import { ConfirmModalComponent } from './pages/shared/confirm-modal/confirm-modal.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { CadastrarVacinaComponent } from './pages/cadastrar-vacina/cadastrar-vacina.component';
import { AdicionarVacinaComponent } from './pages/adicionar-vacina/adicionar-vacina.component';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AdminLayoutModule
  ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        CampanhaComponent,
        ConfirmModalComponent,
        CadastrarVacinaComponent,
        AdicionarVacinaComponent
    ],
    providers: [
        PessoasService,
        VacinaService,
        AuthGuard,
        LoginService
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
