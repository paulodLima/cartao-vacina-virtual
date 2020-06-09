import { Pipe, PipeTransform } from '@angular/core';
import {Pessoa} from '../pages/shared/pessoa';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(names: Pessoa[], searchTerm: string): unknown {
    if (!names || !searchTerm) {
      return names;
    }
    return names.filter(function (name) {
      return name.fullName.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }

}
