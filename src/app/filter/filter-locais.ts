import { Pipe, PipeTransform } from '@angular/core';
import {Pessoa} from '../pages/shared/pessoa';
import {Unidades} from '../pages/shared/unidades';

@Pipe({
  name: 'filterLocais'
})
export class FilterLocais implements PipeTransform {

  transform(local: Unidades[], searchTerm: string): unknown {
    if (!local || !searchTerm) {
      return local;
    }
    return local.filter(function (name) {
      return name.name.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }

}
