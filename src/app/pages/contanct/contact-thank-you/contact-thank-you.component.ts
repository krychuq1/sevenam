import { Component } from '@angular/core';
import {ContentService} from "../../../services/content.service";


@Component({
  selector: 'contact-thank-you',
  templateUrl: './contact-thank-you.html',
  styleUrls: ['./contact-thank-you.scss']
})
export class ContactThankYouComponent {
  content: object;
  constructor(private contentService: ContentService){
    this.content =this.contentService.contactContact;
  }
    // this.isError = true;
    // this.isSent = true;
    // t
}
