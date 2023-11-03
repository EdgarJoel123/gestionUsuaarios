import { ChangeDetectorRef, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/Modelo/rol';
import { Listar } from 'src/app/Modelo/listar';
import { ServiceAutentificacionService } from 'src/app/Services/service-autentificacion.service';
import { ServiceService } from 'src/app/Services/service.service';
import { Modulo } from 'src/app/Modelo/modulo';
import { Operacion } from 'src/app/Modelo/operaciones';
import { NgForm } from '@angular/forms';
import { Detalle } from 'src/app/Modelo/rolOpe';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  formSequence: string[] = ['form1', 'form2', 'form3', 'form4', 'form5']; // Array con los nombres de los formularios
  currentFormIndex: number = 0; // Índice actual del array


  roles: Rol[];


  descripcion_ROL: string;
  nombre_ROL: string;



  id_ROL: number;
  user_NAME: string;
  nomb_USUARIO: string;
  eliminado: string;
  bloqueado: string;
  ape_USUARIO: string;
  dmper_CODIGO: string;
  dmper_NUMERO_ROL: string;

  idRolSeleccion: number;

  idModuloSeleccion: number;



  nombre_MODULO:string;
  descripcion_MODULO: string;

  modulos:  Modulo[];


  operaciones: Operacion[];
  op_NOMBRE: string;
  op_DESCRIPCION: string;

  idOperacionSeleccion: number;



  constructor(private router: Router, private authService: ServiceAutentificacionService, private service: ServiceService) {
  }


  onFormSubmitRol(form: any) {
    if (form.valid) {
      const nuevoRolprueba = new Rol(this.descripcion_ROL.toUpperCase(), this.nombre_ROL.toUpperCase());
  
      this.service.insertarRol(nuevoRolprueba).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Rol creado correctamente') {
            alert("ROL CREADO CON ÉXITO");
            form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR EL ROL");
            form.reset();
            window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL ROL");
          form.reset();
          window.location.reload();
        }
      );
    }
  }
  

  onFormSubmitModulo(form: any) {
    if (form.valid) {
      const nuevoModulo = new Modulo(this.nombre_MODULO.toUpperCase(), this.descripcion_MODULO.toUpperCase());
  
      this.service.insertarModulo(nuevoModulo).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Módulo creado correctamente') {
            alert("MÓDULO CREADO CON ÉXITO");
            window.location.reload();
            form.reset();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR EL MÓDULO");
            window.location.reload();
            form.reset();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL MÓDULO");
          window.location.reload();
          form.reset();
        }
      );
    }
  }
  

  onFormSubmitOperaciones(form: any) {
    if (form.valid) {
      const nuevaOperacion = new Operacion(this.idModuloSeleccion, this.op_NOMBRE.toUpperCase(), this.op_DESCRIPCION.toUpperCase());
  
      this.service.insertarOperacion(nuevaOperacion).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Operación creada correctamente') {
            alert("OPERACIÓN CREADA CON ÉXITO");
            form.reset();
            window.location.reload(); // Recargar la página
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LA OPERACIÓN");
            form.reset();
            window.location.reload(); // Recargar la página
          }
        },
        error => {
          alert("NO SE PUDO CREAR LA OPERACIÓN");
          form.reset();
          window.location.reload(); // Recargar la página
        }
      );
    }
  }
  


  onFormSubmitRolOperacion(form: any) {
    if (form.valid) {
      const nuevaRolOperacion = new Detalle(this.idRolSeleccion, this.idOperacionSeleccion);
  
      this.service.insertarRolOpreaciones(nuevaRolOperacion).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Detalle creado correctamente') {
            alert("ASIGNADO CON ÉXITO");
            form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO ASIGNAR");
            form.reset();
          }
        },
        error => {
          alert("NO SE PUDO ASIGNAR");
          form.reset();
        }
      );
    }
  }
  

  onFormSubmitUsuarios(form: any) {
    if (form.valid) {
      const nuevoUsuario = new Listar(
        this.idRolSeleccion,
        this.user_NAME.toUpperCase(),
        this.nomb_USUARIO.toUpperCase(),
        this.ape_USUARIO.toUpperCase(),
        this.bloqueado,
        this.eliminado,
        this.dmper_CODIGO.toUpperCase(),
        this.dmper_NUMERO_ROL.toUpperCase()
      );
  
      this.service.insertarUsuario(nuevoUsuario).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Usuario creado correctamente') {
            alert("USUARIO CREADO CON ÉXITO");
            console.log("Usuario creado exitosamente:", response);
  
            form.reset();
            window.location.reload();
            // Si deseas avanzar al siguiente formulario después de enviar, descomenta la siguiente línea
            // this.onNextForm();
          } else {
            alert("NO SE PUDO CREAR EL USUARIO");
            console.error("Error al crear usuario:", response);
  
            form.reset();  
            window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL USUARIO");
          console.error("Error al crear usuario:", error);
  
          form.reset();
          window.location.reload();
        }
      );
    }
  }

  

  



 


  





  // Función para avanzar al siguiente formulario
  onNextForm() {
    if (this.currentFormIndex < this.formSequence.length - 1) {
      this.currentFormIndex++;
      sessionStorage.setItem('currentFormIndex', String(this.currentFormIndex)); // Guardar el índice en sessionStorage
    }


  }

  regresarFormulario(){

    if (this.currentFormIndex > 0) {
      this.currentFormIndex--;
    }

  }

  ngOnInit(): void {
   // this.currentFormIndex = Number(sessionStorage.getItem('currentFormIndex')) || 0; // Recuperar el índice almacenado o establecerlo en 0 si no hay ninguno
   
    this.cargarRoles();
    this.cargarModulos();
    this.cargarOperaciones();

  }

  cargarRoles(): void {
    this.service.getListarRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }

  cargarModulos(): void {
    this.service.getListarModulos().subscribe(
      (data) => {
        this.modulos= data;
      },
      (error) => {
        console.error('Error al obtener los modulos:', error);
      }
    );
  }


  cargarOperaciones(): void {
    this.service.getOpreacionModulos(this.idModuloSeleccion).subscribe(
      (data) => {
        this.operaciones = data;
      },
      (error) => {
        console.error('Error al obtener las operaciones:', error);
      }
    );
  }

  seleccionarRol(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idRolSeleccion = parseFloat(target.value);

    console.log('Rol seleccionado:', this.idRolSeleccion);
  }

  seleccionarModulo1(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idModuloSeleccion = parseFloat(target.value);

    console.log('Modulo selccionado:', this.idModuloSeleccion);
    

  }

  seleccionarModulo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idModuloSeleccion = parseFloat(target.value);
  
    console.log('Módulo seleccionado:', this.idModuloSeleccion);
  
    // Llamada al servicio para cargar las operaciones del módulo seleccionado
    this.cargarOperaciones(); // Agrega esta línea para cargar las operaciones
  }


  

  seleccionarOperacion(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idOperacionSeleccion = parseFloat(target.value);

    console.log('Operacion selccionada:', this.idOperacionSeleccion);
    

  }


  cerrarSesion() {
    localStorage.setItem('token', '');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }


  permitirSoloLetras(event: any) {
    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /[a-zA-Z\s]/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  permitirSolo(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const upperCharStr = charStr.toUpperCase(); // Convertir a mayúsculas
  
    if (upperCharStr !== 'S' && upperCharStr !== 'N') { // Cambiado || a &&
      event.preventDefault();
    }
  }
  
}

