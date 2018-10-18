import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    emailFlag:boolean=false;
    passwordPatternFlag=false;
    loading = false;
    selectedUserType: any = "USER";
    registerationForm: FormGroup;
    userTypes: any[] = ['Admin', 'User'];
    userT: string = this.userTypes[0];
    submitted: boolean = false;
    validPassword = false;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.registerationForm = this.formBuilder.group({
            id: ['', []],
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            address: ['', [Validators.required]],
            phoneNo: ['', [Validators.required]],
            userType: ['', [Validators.required]],
        });
    }
    checkPassword() {
        let a = this.registerationForm.value.password;
        if (a == this.registerationForm.value.confirmPassword) {
            this.validPassword = true;
        }
        else {
            this.validPassword = false;
        }
    }
    telFlag:boolean=false;
    keyPress() {
               if(this.model.phoneNo<5999999999 || this.model.phoneNo> 9999999999 ){
            // console.log("f");
            this.telFlag=true;
        }
        else{

            this.telFlag=false;
        }
      }
    //devices = 'Admin User'.split(' ');
    selectedDevice = 'User';
    onChange(newValue) {
        //console.log(newValue);
        this.selectedDevice = newValue;

    }
    checkEmail() {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.model.email)) {
            this.emailFlag=false;
            return (true)
        }
        else{
            this.emailFlag=true;
           // alert("You have entered an invalid email address!")
            return (false)
        }

    }
    checkPassqordFormat() {
        if (/^(?=.*[0-9])[a-z0-9]{8,20}$/i.test(this.model.password)) {
            this.passwordPatternFlag = false;
            return (true)
        }
        else {
            this.passwordPatternFlag = true;
            return (false)
        }

    }

    register() {
        this.checkEmail();
        this.checkPassqordFormat();
       
        this.submitted = true;
        this.model.userType = this.registerationForm.value.userType;
        if (this.registerationForm.invalid) {
          //  console.log(this.registerationForm.invalid);
            return;
        }
        if (!this.validPassword) {
            //console.log(this.registerationForm.value)
            return;
        }
        if(this.telFlag){
            return ;
        }
        if(this.emailFlag){
            return ;
        }
        if(this.passwordPatternFlag){
            return ;
        }
        //this.loading = true;
        //debugger;

       // console.log(this.registerationForm);
        //console.log(this.model)
        //debugger;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }
}
