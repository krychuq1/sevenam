import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  isSent : boolean
  constructor(private formBuilder : FormBuilder){
    this.buildForm();
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
      // language : this.trans.currentLang
    };
    // this.mailerService.sentMail(data).subscribe(
    //   success => {
    //     this.isSent = true;
    //     this.isProcessing = false;
    //     this.contactForm.reset();
    //   },
    //   err => {
    //     this.isProcessing = false;
    //     this.contactForm.reset();
    //
    //   }
    // )
  }
  public onNavigate(url){
    console.log('yo');
    window.open(url, "_blank");
  }
  public yo(){
    console.log('yo');
  }
}
