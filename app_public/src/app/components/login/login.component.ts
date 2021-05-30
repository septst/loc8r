import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuickMessageService } from 'src/app/services/quick-message.service';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formErrors: string = "";
  public title: string = "Sign in to Locator";
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private quickMessageService: QuickMessageService,
    private historyService: HistoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  public onLoginSubmit(): void {
    this.formErrors = "";
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.disable();
    this.doLogin(this.loginForm.value as User);
  }

  private doLogin(user: User): void {
    this.authService.login(user)
      .then(() => {        
        this.router.navigateByUrl(this.historyService.getPreLoginUrl());
        this.quickMessageService.push(`Sign in successful.`);
        this.authService.changes.next(true);
       })
      .catch((err) => {
        this.loginForm.enable();
        this.formErrors = err;
      });
  }

}
