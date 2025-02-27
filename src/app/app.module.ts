import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import { MinhasVacinasComponent } from './pages/minhas-vacinas/minhas-vacinas.component';
import {TextMaskModule} from 'angular2-text-mask';
import { RecaptchaModule } from 'ng-recaptcha';
import { GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { LocaisVacinacaoComponent } from './pages/locais-vacinacao/locais-vacinacao.component';
import { AdicionarVacinaPessoaComponent } from './pages/adicionar-vacina-pessoa/adicionar-vacina-pessoa.component';
import { ListaVacinasComponent } from './pages/lista-vacinas/lista-vacinas.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import {NgxSpinnerModule} from 'ngx-spinner';

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
    AdminLayoutModule,
    TextMaskModule,
    GooglePlaceModule,
    RecaptchaModule,
    NgxSpinnerModule
  ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        CampanhaComponent,
        ConfirmModalComponent,
        CadastrarVacinaComponent,
        AdicionarVacinaComponent,
        MinhasVacinasComponent,
        LocaisVacinacaoComponent,
        AdicionarVacinaPessoaComponent,
        ListaVacinasComponent,
        RecuperarSenhaComponent
    ],
    providers: [
        PessoasService,
        VacinaService,
        AuthGuard,
        LoginService
    ],
    exports: [
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
    bootstrap: [AppComponent]
})
export class AppModule { }
