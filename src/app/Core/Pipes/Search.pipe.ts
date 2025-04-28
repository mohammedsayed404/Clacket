import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSearch',
  standalone: true,
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], query: string): any[] {
    return value;
  }

}
