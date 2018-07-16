import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as config from '../config';

@Injectable()
export class ContentService {
  contentService: string;

  constructor(private http: HttpClient) {
    this.contentService = config.content;
  }

  public getContent(path): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.contentService + path + localStorage.getItem('lan')).subscribe((res) => {
        if (res[0]) {
          const response = res[0].content;
          // init variable
          const content = {};
          // for each to make obj out of array
          response.forEach(function (row) {
            content[row.key] = row.value;
          });
          resolve(content);
        } else {
          resolve([]);
          console.log('NO DATA FROM CONTENT SERVICE ', res);
        }
        /**
         * @event Cms#contentFetched
         * @type { void }
         */
      }, (err) => {
        reject(err);
      });
    });

  }
}
