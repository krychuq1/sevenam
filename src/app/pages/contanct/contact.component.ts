import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {MailerService} from "../../services/mailer.service";
import {ContentService} from "../../services/content.service";
import {LanguageService} from "../../services/language.service";
import {Router} from "@angular/router";

@Component({
  selector: 'contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  nameControl;
  emailControl;
  messageControl;
  EMAIL_PATTERN = /^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$/;
  isProcessing: boolean;
  isSent : boolean;
  isError: boolean;
  contentUrl: string;
  content: object;
  constructor(private formBuilder : FormBuilder, private loadingService: LoadingService,
              private mailerService: MailerService, private contentService: ContentService,
              private languageService: LanguageService, public router: Router){
    this.buildForm();
    this.loadingService.homeLoader.next(true);
    this.contentUrl = 'page/contact/';
    this.getContent();
    this.languageService.changeLanguage.subscribe(()=>{
      this.getContent();
    });
    // setTimeout(()=>{
    //   this.isSent = true;
    //   this.router.navigate(['contact/thank-you'])
    // },1000);
    // this.isError = true;
    // this.isSent = true;
    // this.isProcessing = true;
  }

  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{
      this.content = content;
      this.contentService.contactContact = content;
      console.log(this.content);
    }, err => {
      console.error(err);
    });
  }
  private buildForm(){
    this.contactForm = this.formBuilder.group({
      name  : this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      email : this.formBuilder.control(null, [Validators.pattern(this.EMAIL_PATTERN), Validators.required]),
      message : this.formBuilder.control(null, [Validators.required, Validators.minLength(10)])
    });

    this.nameControl = this.contactForm.get('name');
    this.emailControl = this.contactForm.get('email');
    this.messageControl = this.contactForm.get('message');
  }
  public onSubmitForm(){
    this.isProcessing = true;
    var data ={
      name : this.nameControl.value,
      from : this.emailControl.value,
      message : this.messageControl.value,
      language : 'en'
    };
    this.mailerService.sentMail(data).subscribe(
      success => {
        this.isSent = true;
        this.isProcessing = false;
        this.router.navigate(['contact/thank-you']);
        this.contactForm.reset();
      },
      err => {
        this.isProcessing = false;
        this.isError = true;
        this.contactForm.reset();

      }
    )
  }
  public openChat(){
    window['Tawk_API'].maximize();
  }
  public reset(){
    this.isError = false;
    this.isSent = false;
  }
  public onNavigate(url){
    window.open(url, "_blank");
  }
  public yo(){
    console.log('yo');
  }
}
