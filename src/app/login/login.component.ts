import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import {FormBuilder,FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    userTypes:any[] = ['Admin' ,'User'];
    loginForm:FormGroup;
    userT:string=this.userTypes[0];
    //userTypes:any[] = ['Admin' ,'User'];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private formBuilder:FormBuilder) { 
            this.loginForm=this.formBuilder.group({
                userType:[],
                username:[],
                password:[],
            })
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
       
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    setUserType(){
        //console.log(this.loginForm.value.userType);
    }

devices = 'Admin User'.split(' ');
  selectedDevice = 'User';
  onChange(newValue) {
   // console.log(newValue);
    this.selectedDevice = newValue;
    // ... do other stuff here ...
}
    userKey: string;

    login() {
        //this.loading = true;
     //   console.log(this.loginForm.value);
        this.model.userType= this.loginForm.value.userType;
        this.userKey=this.model.username;
        this.authenticationService.login(this.userKey, this.model.password,this.model.userType)
            .subscribe(
                data => {
       //         console.log(data);
                //userDashboard
                if(data.userType==this.userTypes[1]){
         //           console.log(this.returnUrl);
                    let userUrl=this.returnUrl+"userDashboard";
                    this.router.navigate([userUrl]);
                }
                if(data.userType==this.userTypes[0]){
           //         console.log(this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                }
                    
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
