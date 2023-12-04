import { PipeTransform, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'bold',
})

export class BoldPipe implements PipeTransform {
    transform(value: any, search: any) {
        if (!search) {
            return value;
        }
        if (search.detail.value && search.detail.value.length != '') {
            let searchLength = search.detail.value.length;
            let holder = value.split('');
            let indexAdder = 0;
            let indexs = this.locations(search.detail.value.toLowerCase(), value.toLowerCase())
            indexs = indexs.map((x) => {
                let solution = x + indexAdder;
                indexAdder += 2;
                return solution;
            })
            indexs.forEach((i) => {
                holder.splice(i, 0, "<b class='bold'>")
                holder.splice(i + searchLength + 1, 0, "</b>")
            })
            return holder.join('');
        }
    }
    locations(substring, searchValue) {
        let indexs = [], i = -1;
        while ((i = searchValue.indexOf(substring, i + 1)) >= 0) {
            indexs.push(i);
        }
        return indexs;
    }
}