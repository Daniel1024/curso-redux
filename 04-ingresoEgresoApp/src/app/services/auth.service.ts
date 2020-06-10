import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: UsuarioModel;

  get user(): UsuarioModel {
    return {...this._user};
  }

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((fsUser: any) => {
            const user = UsuarioModel.fromFirebase(fsUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({user}));
          })
      } else {
        // no existe
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new UsuarioModel(user.uid, nombre, user.email);

        return this.firestore.doc(`${user.uid}/usuario`)
          .set({...newUser});
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
}
