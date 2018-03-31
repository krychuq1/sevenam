import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LoadingService{
  public homeLoader: Subject<boolean> = new Subject();
  constructor(){
  }

}
