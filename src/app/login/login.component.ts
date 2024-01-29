import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  message: string = 'Vous etes déconnecté (admin/admin)!'
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage(){
    if(this.authService.isLoggedIn){
      this.message = 'Vous etes connecté !'
    }else{
      this.message = 'Login ou mot de passe incorect !'
    }
  }

  login(){
    this.message = 'Tantative de connexion !!'
    this.authService.login(this.name, this.password)
        .subscribe((isLoggedIn: boolean) => {
          this.setMessage();
          if(isLoggedIn){
            this.router.navigate(['/pokemons']);
          }else{
            this.password = '';
            this.router.navigate(['/login']);
          }
        });
  }

  logout(){
    this.authService.logout();
    this.message = 'Vous etes déconnecté !';
  }

}
