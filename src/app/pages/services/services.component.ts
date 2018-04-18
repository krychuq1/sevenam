import { Component } from '@angular/core';
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'services',
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent {
  packages;
  constructor(private loadingService: LoadingService){
    this.packages = {
      first: false,
      second: false,
      third: false
    }
    this.loadingService.homeLoader.next(true);

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
