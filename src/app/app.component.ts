import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store';
  persona = {
    Nombre: "Ana",
    Edad: 18
  }
  btbDisabled = true;


  listenBtn(event: Event) {
    const nombre = event.target as HTMLInputElement
    alert("Hola " + nombre.value)
  }

  onKeyUp(event: Event) {
    const element = event.target as HTMLInputElement
    this.persona.Nombre = element.value;
  }

  emojis = ['😂', '🐦', '🐳', '🌮', '💚']
  color = 'azul'

  form = {
    email: '',
    password: ''
  };

  submitLogin(e: Event) {
    e.preventDefault()
    alert('enviado con exito usuario: ' + this.form.email)
  }
}
