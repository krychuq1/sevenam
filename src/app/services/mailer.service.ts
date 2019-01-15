import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as config from '../config';

@Injectable()
export class MailerService {
  mailerUrl: string;
  constructor(private http: HttpClient){
    this.mailerUrl = config.mailerUrl;
  }
  sentMail(body: Object){
    return this.http.post(this.mailerUrl, body);
  }

}
