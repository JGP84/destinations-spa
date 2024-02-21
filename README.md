
# Prueba técnica de angular

**Se ha decidido que la información que se consuma sea sobre destinos turísticos en lugar de héroes, para que esté más alineada con la empresa postulada.**

# Checklist de Requerimientos

- [x] Utilizar la última versión LTS de Angular, Typescript y de cualquier librería que se use en el proyecto.

## Servicio
- [x] Crear un servicio que guarde la información de los súper héroes.
- [x] El servicio debe permitir consultar todos los súper héroes.
- [x] El servicio debe permitir consultar un único súper héroe por id.
- [x] El servicio debe permitir consultar todos los súper héroes que contienen, en su nombre, el valor de un parámetro enviado en la petición.
- [x] El servicio debe permitir modificar un súper héroe.
- [x] El servicio debe permitir eliminar un súper héroe.
- [x] (Opcional) Test unitario del servicio.

## Componente
- [x] Crear un componente que utilice el servicio anterior.
- [x] El componente debe mostrar una lista paginada de héroes con botones de añadir, editar y borrar.
- [x] El componente debe mostrar un input para filtrar por el héroe seleccionado.
- [x] El componente debe generar un formulario vacío al pulsar el botón de añadir.
- [x] El componente debe generar un formulario con los datos del héroe seleccionado al pulsar el botón de edición.
- [x] El componente debe preguntar si se está seguro que se desea borrar el héroe y, al confirmarlo, lo borrarlo.
- [x] (Opcional) Test unitario del componente.

## Puntos a tener en cuenta
- [x] La información de súper héroes se guardará dentro del servicio.
- [x] Se valorarán las soluciones propuestas para cada punto, el modelo de datos y formato del código.
- [x] La prueba se debe presentar en un repositorio de Git.

## Puntos opcionales de mejora
- [x] Utilizar Angular Material como apoyo visual.
- [x] Rutas y navegación de la página.
- [x] Presentar la aplicación “Dockerizada”.
- [x] Interceptor para mostrar un elemento “loading” mientras se realiza alguna operación como “borrado” o “edición”.
- [x] Directiva para que al crear o editar en la caja de texto del nombre del héroe, siempre se muestre en mayúscula.
- [x] Uso de mockserver para poder implementar las llamadas HTTP sin un backend.
- [x] Comunicación entre componentes orientada a eventos.

## Se valorará positivamente
  - La construcción del modelo de datos.

## EXTRAS (no demandado en los requerimientos)
  - Se ha incorporado el local storage para guardar y recuperar los datos de los formularios en caso de recarga del navegador.

  

# DestinationsSpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Ejecutando la aplicación con Docker

Para ejecutar esta aplicación con Docker, sigue estos pasos:

1. **Construye la imagen de Docker**. En la raíz del proyecto, ejecuta el siguiente comando:

```bash
docker build -t nombre-de-tu-imagen .
```

Este comando construirá una imagen de Docker para tu aplicación utilizando el archivo `Dockerfile` en la raíz del proyecto. Puedes reemplazar `nombre-de-tu-imagen` con el nombre que quieras darle a tu imagen.

2. **Ejecuta el contenedor de Docker**. Una vez que la imagen se haya construido, puedes ejecutarla con el siguiente comando:

```bash
docker run -p 80:80 nombre-de-tu-imagen
```

Este comando ejecutará un contenedor de Docker basado en tu imagen. La opción `-p 80:80` mapea el puerto 80 del contenedor al puerto 80 de tu máquina local.

Ahora deberías poder acceder a tu aplicación en `http://localhost`.
