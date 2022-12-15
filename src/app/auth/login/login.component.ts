import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngAfterViewInit(): void {
    this.googleInit()    
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '298700918315-p027l7dnr8fis8ki0q5u1mci04et77t2.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse( response )
    })

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    )
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential)
    this.usuarioService.loginGoogle( response.credential )
      .subscribe(resp => {
        // console.log({login: resp})
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      })
  }

  login() {

    console.log(this.loginForm.value);

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember')?.value ) {
          localStorage.setItem('email', this.loginForm.get('email')?.value );
        }else {
          localStorage.removeItem('email');
        }

       this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

}
