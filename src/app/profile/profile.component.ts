import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p>You're logged in!
      <span *ngIf="currentUser$ | async as currentUser">
        Welcome, {{currentUser | json}}
      </span>
    </p>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser$!: Observable<any>;
  constructor(private _oktaAuthStateService: OktaAuthStateService) { }

  public ngOnInit(): void {
    this.currentUser$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims ?? '')
    );

  }
}
