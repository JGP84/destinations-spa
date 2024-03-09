
# Angular Technical Test

[![Go to my app in live](src/assets/img/screenshot-mac.png)](https://jgp84.github.io/destinations-spa/ "Go to my app in live")

**[Go to my app in live](https://jgp84.github.io/destinations-spa/)**

# Angular Technical Test

## Requirements Checklist

### Project Setup
- [x] Use the latest LTS version of Angular, Typescript and any library used in the project.
- [x] The test must be presented in a Git repository.

### Service
- [x] Create a service that stores the information of the destinations.
- [x] The service should allow to:
  - [x] Consult all the destinations.
  - [x] Consult a single destination by id.
  - [x] Consult all the destinations that contain, in their name, the value of a parameter sent in the request.
  - [x] Modify a destination.
  - [x] Delete a destination.
- [x] (Optional) Unit test of the service.

### Component
- [x] Create a component that uses the previous service.
- [x] The component should:
  - [x] Display a paginated list of destinations with add, edit and delete buttons.
  - [x] Display an input to filter by the selected destination.
  - [x] Generate an empty form when pressing the add button.
  - [x] Generate a form with the data of the selected destination when pressing the edit button.
  - [x] Ask if you are sure you want to delete the destination and, upon confirmation, delete it.
- [x] (Optional) Unit test of the component.

### Additional Considerations
- [x] The destination information will be stored within the service.
- [x] The proposed solutions for each point, the data model and code format will be valued.

### Optional Improvements
- [x] Use Angular Material as visual support.
- [x] Implement routes and navigation of the page.
- [x] Dockerize the application.
- [x] Implement an interceptor to show a "loading" element while an operation such as "deletion" or "edition" is being performed.
- [x] Implement a directive so that when creating or editing in the text box of the destination name, it always appears in uppercase.
- [x] Use of mockserver to implement HTTP calls without a backend.
- [x] Implement event-oriented component communication.

### Positively Valued
- [x] The construction of the data model.
- [x] Use of reactive programming.
- [x] Readable code using lambdas.

### Extras (Not Required)
- [x] Implement local storage, to save and retrieve form data in case of browser reload.
- [x] Implement a custom pipe, to truncate the number of characters that the card will display in the description.
- [x] Make the application responsive for mobile.
- [x] Implement animations, to stylize the cards and buttons.
- [x] Deploy the application on Github Pages.

***

# Destinations SPA

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
