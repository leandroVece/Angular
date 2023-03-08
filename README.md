# Angular 
>Nota: Antes de iniciar te recomiendo descargar la extensión en vsc de Angular Language Service que te ayudara con los problemas de tipeo en el codigo.

Para trabajar con angular primero vamos a instalarla de manera global. Para ello es necesario tener instalado node.js con anterioridad.

    npm i -g @angular/cli

Esto instalara la version mas reciente de manera global. Luego para iniciar un nuevo proyecto escribiremos en nuestra terminal

    ng new my-project

con esto podremos correr nuestra aplicacion despues de una serie de preguntas simples y una eleccion de un preprocesador de css. Si no estas familiarizado con los preprocesadores de css. simplemente puedes elegir la primera opcion de lo contrario puedes elegir la que estes mas familiarizado. de todas maneras no vamos a tocar el tema de los estilo en esta pequeña unidad.

## Cominicacion de datos

En angular, usamos typeScript para realizar las partes logicas del lado del cliente. como no es un curso de typeScript y voy a tomar por sabido tales temas, en caso contrario no se desanime. ya que no es algo que le impedira aprender sobre este Framework.

Comencemos por eliminar el contenido de nuestro archivo app.componet.html. Luego escribamos el siguiente lineas.

    <h1>Hola {{'mundo'}}</h1>

Como pueden ver aqui rellenamos el contenido de una forma "hibrida". con esto podemos ver que se puede interactuar como si fuera una pagina normal accediendo a su contenido por medio de Js. por ejemplo, usemos Js para repetir el contenido un par de veces

    <h1>Hola {{'mundo'.repeat(2)}}</h1>

Como se puede apreciar use una funcion de js para modificar el contenido siempre manteniedolos dentro de las dobles llaves.

## Division de responsabilidades

Un componente de Angular se divide en tres archivos: uno para el código TypeScript, otro para el código HTML y uno más para el código CSS.
Si vamos a nuestro archivo app.component.ts podemos ver claramente esta distincion.

    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent {
      title = 'store';
    }

Angular usa el concepto de decoradores para modificar el comportamiento de las clases. Un decorador angular es una clase especial de declaración que puede acoplarse a una clase, método, propiedad o parámetro. Los decoradores se declaran de la siguiente manera @expression, donde la expresión debe evaluar a una función. Gracias al parámetro @ podemos reconocer fácilmente que estamos hablando de un decorador.

La clase AppComponent implementa el decorador @Component() para indicarle a Angular que esta clase será un componente. Dentro de este decorador, puedes observar el selector del componente (un nombre para el mismo), el template HTML y la hoja de estilos que usará.

Para probar su funcionalidad agreguemos una pequeña varaible a nuestra clase AppComponet.

    export class AppComponent {
      title = 'store';
      Nombre = 'Juan';
    }

Luego volvamos a nuestros archivos html asociado a nuestro decorador y llamemos a nuestra variable.

    <h1>Hola {{Nombre}}</h1>

>Nota: si la variable esta mal escrita, el programa lo reconocera como un error. este atento a esto ya que en Js, al no ser fuertemente tipado podria dejar pasar cosas como esta.

¡Felicidades ahora sabe como pasar parametros a nuestros archivos Html! Sigamos mas adelante para ver que mas podemos hacer con esto.

## propety binding

Es la manera que dispone Angular para controlar y modificar las propiedades de los distintos elementos de HTML. Para esto, simplemente utiliza los corchetes [] para poder modificar dinámicamente ese atributo desde el controlador.

Pongámoslo en un ejemplo simple. En nuestra funcion AppComponent agregaremos un nuevo parametro para un boton que vamos a crear.

    export class AppComponent {
      title = 'store';
      Nombre = 'Juan';
      btbDisabled = true;
    }

**HTML**

    <button [disabled]="btbDisabled">boton</button>

Vemos que el estado del boton va a depender especificamente de mi nuevo atributo btnDisabled. Claro que este no es el unico caso, pero sirve para visualizar lo que podemos hacer con las propety binding.

provemos algo mas que podria ser mas comun, como darle un valor a un input.

    export class AppComponent {
      title = 'store';
      Nombre = 'Juan';
      btbDisabled = true;
    }

**HTML**

    <input type="button" [value]="Nombre">

## Eventos o Event binding

Para crear eventos la sintaxis todavia siguie siendo amigable. modifiquemos entonces nuestro boton para que llame a un alert cuando le le demos un click.

    export class AppComponent {
      title = 'store';
      Nombre = 'Juan';
      btbDisabled = true;
      value = 'Juan';

      listenBtn() {
        alert("Hola " + this.Nombre)
      }
    }

**HTML**

    <input type="button" (click)="listenBtn()" [value]="Nombre">

Ahora que sabemos como crear eventos, tambien vemos la necesidad de saber como pasar parametros a los eventos que creamos. Hagamos la modificacion entonces.

    listenBtn(event: Event) {
      const nombre = event.target as HTMLInputElement
      alert("Hola " + nombre.value)
    }

**HTML**

    <input type="button" (click)="listenBtn($event)" [value]="Nombre">

Con esto logramos capturar el valor del imput y mandarlo a nuestra funcion. Como se puede apreciar, los elementos pertenecinetes al don necesitas que se le anteponga el signo "$" para que sea reconocido.

Luego es necesario que el nombre de lo que le enviamos, sea "tipeado" en nuestra funcion y lo podremos tratar como un elemento html capturado por Js.

Veamos otro ejemplo y agregruemos el siguiente metodo.

      onKeyUp(event: Event) {
        const element = event.target as HTMLInputElement
        this.Nombre = element.value;
      }

**HTML**

    <input type="text" [value]="Nombre" (keyup)="onKeyUp($event)">

Con esto ahora estamos capturando el valor del input y cada vez que este valor cambia, su contenido cambia dinamicamente.

## Data binding con ngModel

El ngModel es una directiva en Angular que te permite realizar Two-Way Data Binding. Con Two-Way Data Binding, puedes vincular una propiedad tanto para la lectura como para la escritura, lo que significa que tanto la vista como el componente pueden actualizar el valor de la propiedad y ambos se mantendrán sincronizados.

Para hacer este ejemplo vamos a importar el Modulo del paquete de Angular Forms. Para hacerlo vamos a nuestro archivo App.module.ts.

    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';

    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }

>Nota: Estos son paquetes con nombres preestablecidos, no son nombre aleatorios y arbitrarios.

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
    }

Ahora si hacemos una pequeña modificacion a nuestro input veremos que todo permenace igual.

    <input type="text" [(ngModel)]="Nombre" (keyup)="onKeyUp($event)">

Claro que este no es la unica fucion conveniente que tiene este paquete. por ejemlplo creemos otro input, pero esta vez que reciba numeros.

    <input type="text" #ageInput="ngModel" max="18" min="17" required [(ngModel)]="persona.Edad">
    <p>{{ageInput.valid}}</p>

Lo que hicimos aqui es una "validacion" simple del formulario. gracias al paquete de angular Forms, nos permite identificar gracias a la etiqueta #ageInput los campos que pusimos como regla en las etiquetas html.

De esa manera si el input tiene un numero que no este dentro de nuestro rango (max y min) o no tenga nada(requiered) nos mostrara un resultado que varia entre true o false.

## Estructuras de control

Los condicioneles son estructuras de control basicas que inevitablementes vamos a usar. Angular tiene su forma particular de condicional que es ngIf.

veamoslo en un ejemplo.

    <p *ngIf="(persona.Edad<= 20)">Soy el if de tu else</p>

Para usar un else en Angular, la sintaxis es algo especial. Debes crear un template en tu código HTML usando la etiqueta que provee Angular llamada ng-template con una Variable de Template, comenzando con #, para hacer referencia a este elemento desde tu If.

    <p *ngIf="(persona.Edad <= 10) else templateElse">Soy el if de tu else</p>
    <ng-template #templateElse>
      <div>yo soy el else </div>
    </ng-template>

## Iteradores

De la misma manera que los if, en Angular los el iterador tiene una forma particular de ser llamado.

agregurmos un arra de emogin a nuestra clase component

    emojis = ['😂', '🐦', '🐳', '🌮', '💚']

luego iteremoslos en una etiqueta nueva y veamos su comportamiento.

    <ul>
      <li *ngFor="let el of emojis ">
        {{ el }}
      </li>
    </ul>

ngFor también cuenta con un índice con el número de iteraciones. Puedes acceder a este número agregando al ngFor index as i de la siguiente manera

    <ul>
      <li *ngFor="let el of emojis; index as i"">
        {{ el }}
      </li>
    </ul>

## *ngSwitch

como su nombre lo indica y como lo he estado presentando, *ngSwitch es la forma particular de  Angular para hacer un switch.

    <div [ngSwitch]="color">
      <p *ngSwitchCase="'azul'">
        El color el Azul
      </p>
      <p *ngSwitchCase="'verde'">
        El color el Verde
      </p>
      <p *ngSwitchCase="'rojo'">
        El color el Rojo
      </p>
      <p *ngSwitchDefault>
        No hay ningún color
      </p>
    </div>

En este caso solo tenemos que agregar una variable que guarde un string con un color y ver el resultado.

## NgClass y NgStyle

Con el binding de [class] y [style] puedes agregar clases y estilos fácilmente. Pero se vuelve algo complicado en el caso de que necesites agregar varias clases o modificar muchos estilos. Es por esto que Angular ofrece las directivas ngClass y ngStyle para este propósito.

Puedes bindear la directiva [ngStyle] o [ngClass] y pasarle un objeto con cada propiedad o clase que deseas agregar:

**html**

    <p class="ms-error" [class.invalid]="ageInput.invalid">Campo requerido </p>

**app.componet.css**

    .ms-error {
      background-color: red;
      color: white;
    }

Con lo que agregamos recientemente creamos una pequeña validadcion (aunque no muy coerente) para nuestro input de edad, pero no tiene sentido que se muestre cuando el valor sea verdadero ¿verdad? Veamos como lo solucionamos.

    .ms-error {
      background-color: red;
      color: white;
      opacity: 0;
      &.invalid {
        opacity: 1;
      }
    }

Con esta pequeña adecion, creamos dos verificamos si la clase es invalid. en tal caso la opacidad estara al maximo mostrandonos nuestro cartel de requedido, caso contrario estara invisible al ojo.

Veamos el siguiente ejemplo con el style.

    <p [style.color]="ageInput.valid ? 'white' : 'red'">Campo requerido </p>

Aqui determinamos el css que desde el archivo html y escondemos su contenido al ojo a travez de un operador ternario. En este caso simplemente lo escribi pero facilmente podria crear una variable que tenga este valor y llamarlo dentro de mi condicional. Todo queda bajo la imaginacion de uno.

Con el binding de [class] y [style] puedes agregar clases y estilos fácilmente. Pero se vuelve algo complicado en el caso de que necesites agregar varias clases o modificar muchos estilos. Es por esto que Angular ofrece las directivas ngClass y ngStyle para este propósito.

**html**

    <p [ngClass]="ageInput.valid ? 'ms-error-false' : 'ms-error-true'">Campo requerido ejemplo 3 </p>

**css**

    .ms-error-false {
      background-color: red;
      color: white;
      opacity: 0;

    }

    .ms-error-true {
      background-color: red;
      color: white;
      opacity: 1;

    }

En este caso estamos cambiando las classe de manera dinamica, verifiacando los parametros que pusimos en nuestro input number.

Y para el ultimo caso es algo mas conveniente porque nos permiria tener mas de un estilo desde nuestro archivo html.

    <p [ngStyle]="ageInput.valid ?
            { 'color': 'white',
            'background': 'white'} :
            {
              'color': 'white',
              'background': 'red'
            }">Campo requerido ejempo 4 </p>


## Formularios

por ultimo veamos la particularidad de los formularios con Angular.

**TS**

    export class AppComponent {
      ...
        form = {
            email: '',
            password: ''
          };

            submitLogin(e: Event) {
              e.preventDefault()
              alert('enviado con exito usuario: ' + this.form.email)
            }
    }

**html**

    <form (ngSubmit)="submitLogin($event)" #formLogin="ngForm">
      <div>
        <label></label>
        <input name="email" type="email" [(ngModel)]="form.email" required />
      </div>
      <div>
        <label></label>
        <input name="password" type="password" [(ngModel)]="form.password" required />
      </div>
      <div>
        <button [disabled]="formLogin.invalid" type="submit">Iniciar sesión</button>
      </div>
    </form>

Con este ultimo ejemplo vemos que creamos un objeto que captura los valores de los input y los almacena, luego la propiedad disabled esta activa mientras el formulario no se complete.

Al final cuando apretamos el boton de iniciar sesion vemos llama a nuestra funcion submitLogin() que nos envia una alerta que nos verifica que todo esta andando correctamente.

Con esto podriamos decir que has aprendido los conceptos mas basicos de Angular, los que te permitirian. !Felicidades por llegar hasta aqui! en una siguiente parte profundizaremos y veremos aun mas sobre este tema.
