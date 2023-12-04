import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'firstLetterCap',
})
export class FirstLetterCapitalPipe implements PipeTransform {
    transform(value: any, search: any) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}