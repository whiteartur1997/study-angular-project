import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if(user) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    })
  }

  onSaveData() {
    this.dataStorageService.saveRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
