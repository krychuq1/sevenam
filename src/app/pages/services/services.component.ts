import { Component } from '@angular/core';

@Component({
  selector: 'services',
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent {
  packages;
  constructor(){
    this.packages = {
      first: false,
      second: false,
      third: false
    }
  }
  setPackages(packageName){
    switch(packageName) {
      case 'first':
        this.packages.first = !this.packages.first;
        break;
      case 'second':
        this.packages.second = !this.packages.second;
        break;
      case 'third':
        this.packages.third = !this.packages.third;
        break;
    }
    // this.packages.first = first;
    // this.packages.second = second;
    // this.packages.third = third;
  }

}
