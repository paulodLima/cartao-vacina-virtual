import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PessoasComponent} from '../../pages/pessoas/pessoas.component';
import {RegisterVaccineComponent} from '../../pages/register-vaccine/register-vaccine.component';
import {CadastrarPessoaComponent} from '../../pages/cadastrar-pessoa/cadastrar-pessoa.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FilterPipe} from '../../filter/filter.pipe';
import {FilterVacinaPipe} from '../../filter/filter-vacina.pipe';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {FilterLocais} from '../../filter/filter-locais';
import {SortPipe} from '../../filter/sort.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    GooglePlaceModule
  ],
  exports: [
    FilterPipe,
    FilterVacinaPipe,
    FilterLocais,
    SortPipe
  ],
  declarations: [
    UserProfileComponent,
    PessoasComponent,
    MapsComponent,
    RegisterVaccineComponent,
    CadastrarPessoaComponent,
    FilterPipe,
    FilterLocais,
    FilterVacinaPipe,
    SortPipe
  ]
})

export class AdminLayoutModule {}
