import {Component, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../../shared/alert/alert.component";
import {PlaceholderDirective} from "../../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  error = null;
  private closeSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  onCloseModal() {
    this.error = null
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  onSubmit(authForm: NgForm) {
    if(authForm.invalid) {
      return
    }
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true
    if(this.isLoginMode) {
      authObs = this.authService.login(authForm.value)
    } else {
      authObs = this.authService.signup(authForm.value)
    }
    authObs.subscribe({
      next: resData => {
        this.isLoading = false;
        authForm.reset()
        this.router.navigate(['/recipes'])
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage)
        this.isLoading = false;
        authForm.reset()
      },
      complete: () => {

      }
    })
  }
}
