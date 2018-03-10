import { Component } from '@angular/core';

@Component({
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent {
  filter: string;
  constructor(){
    this.filter = 'visual';
  }
  setFilter(filter){
    this.filter = filter;
  }
}
