import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../general/utils/utils';
import { AccessService } from '../../../services/access/access.service';
import { User, UserData } from '../../../models/access/access.model';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

    private _signinForm: FormGroup;

    /**
     * SigninComponent Constructor
     * @param {AccessService} _accessService 
     */
    constructor(private _accessService: AccessService,
        private _router: Router) {
    }

    /**
     * ngOnInit Implementation
     */
    ngOnInit() {
        this._signinForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.emailValidator]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)])
        });
    }

    /**
     * Function to login user
     */
    login(): void {
        let _userData: UserData = { username: this._signinForm.value.email, password: this._signinForm.value.password, platform: 'WEBApp' };
        let _trapSend: User = {
            from: 'signin',
            data: _userData,
            at: new Date().toISOString(),
            token: '',
            track: 0
        }
        let _trapSendCode = { code: btoa(JSON.stringify(_trapSend)) };
        this._accessService.login(_trapSendCode).subscribe((result) => {
            console.log('test');
            console.log(result);
            //this._router.navigateByUrl('/profile');
        }, (err) => {
            console.error(err);
        });
        /*this._accessService.getUser({ email: this._signinForm.value.email }).subscribe((result) => {
            console.log('test');
            console.log(result);
        });*/
    }

    /**
     * ngOnDestroy Implementation
     */
    ngOnDestroy() {

    }
}