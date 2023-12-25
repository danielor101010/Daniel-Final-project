import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  
@Input()objects:any[]=[]
@Output()filteredObjects = new EventEmitter<any[]>()
filterInput:string = ''
tempFilter:any[]=[]

filterObject(): void {
  const filterText = this.filterInput.trim().toLowerCase(); 
  if (filterText === '') {
    this.filteredObjects.emit(this.objects);
  } else {
    this.tempFilter = this.objects.filter(object =>
      object.destination.toLowerCase().includes(filterText)
    );
    this.filteredObjects.emit(this.tempFilter);
  }
}



}
