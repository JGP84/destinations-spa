# DestinationsSpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


# Checklist de Requerimientos

- [x] Utilizar la última versión LTS de Angular, Typescript y de cualquier librería que se use en el proyecto.

## Servicio
- [X] Crear un servicio que guarde la información de los súper héroes.
- [ X ] El servicio debe permitir consultar todos los súper héroes.
- [ X ] El servicio debe permitir consultar un único súper héroe por id.
- [x] El servicio debe permitir consultar todos los súper héroes que contienen, en su nombre, el valor de un parámetro enviado en la petición.
- [ X ] El servicio debe permitir modificar un súper héroe.
- [x] El servicio debe permitir eliminar un súper héroe.
- [ ] (Opcional) Test unitario del servicio.

## Componente
- [ X ] Crear un componente que utilice el servicio anterior.
- [ X ] El componente debe mostrar una lista paginada de héroes con botones de añadir, editar y borrar.
- [ X ] El componente debe mostrar un input para filtrar por el héroe seleccionado.
- [ ] El componente debe generar un formulario vacío al pulsar el botón de añadir.
- [ ] El componente debe generar un formulario con los datos del héroe seleccionado al pulsar el botón de edición.
- [ ] El componente debe preguntar si se está seguro que se desea borrar el héroe y, al confirmarlo, lo borrarlo.
- [ ] (Opcional) Test unitario del componente.

## Puntos a tener en cuenta
- [ X ] La información de súper héroes se guardará dentro del servicio.
- [ X ] Se valorarán las soluciones propuestas para cada punto, el modelo de datos y formato del código.
- [ X ] La prueba se debe presentar en un repositorio de Git.

## Puntos opcionales de mejora
- [ X ] Utilizar Angular Material como apoyo visual.
- [ X ] Rutas y navegación de la página.
- [ ] Presentar la aplicación “Dockerizada”.
- [ ] Interceptor para mostrar un elemento “loading” mientras se realiza alguna operación como “borrado” o “edición”.
- [ X ] Directiva para que al crear o editar en la caja de texto del nombre del héroe, siempre se muestre en mayúscula.
- [ X ] ¿Uso de mockserver para poder implementar las llamadas HTTP sin un backend?.
- [ ] Comunicación entre componentes orientada a eventos.

## Se valorará positivamente
- [ X ] Cómo se construye el modelo de datos
