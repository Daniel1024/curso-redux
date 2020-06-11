import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../models/usuario.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  user: UsuarioModel;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(filter(({user}) => user !== null))
      .subscribe(({user}) => this.user = user);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }

}
