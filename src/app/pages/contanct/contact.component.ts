import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {MailerService} from "../../services/mailer.service";

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
  constructor(private formBuilder : FormBuilder, private loadingService: LoadingService,
              private mailerService: MailerService){
    this.buildForm();
    this.loadingService.homeLoader.next(true);
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
        this.contactForm.reset();
      },
      err => {
        this.isProcessing = false;
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
