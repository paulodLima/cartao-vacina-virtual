import { Pipe, PipeTransform } from '@angular/core';
import {Vacina} from './pages/shared/vacina.model';

@Pipe({
  name: 'filterVacina'
})
export class FilterVacinaPipe implements PipeTransform {

  transform(names: Vacina[], searchTerm: string): unknown {
    if (!names || !searchTerm) {
      return names;
    }
    return names.filter(function (name) {
      return name.nome_vacina.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }


}
