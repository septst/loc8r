import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HistoryService } from '../../services/history.service';
import { User } from '../../models/user';
import { QuickMessageService } from 'src/app/services/quick-message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formErrors: string = "";
  public registerForm: FormGroup;
  public submitted: boolean = false;
  public hidePassword: boolean = true;

  public pageContent = {
    title: "Create a new account"
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private historyService: HistoryService,
    private quickMessageService: QuickMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  get controls() {
    return this.registerForm.controls;
  }

  public onRegisterSubmit(): void {
    this.submitted = true;
    this.formErrors = "";

    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.disable();
    this.doRegister(this.registerForm.value as User);
  }

  private doRegister(newUser: User): void {
    this.authService.register(newUser)
      .then(() => {
        this.router.navigateByUrl(this.historyService.getPreRegisterUrl());
        this.quickMessageService.push(`Registration successful.`);
      })
      .catch((message) => {
        this.formErrors = message;
        this.registerForm.enable();
      });
  }
}
