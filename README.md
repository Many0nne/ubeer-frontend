[![wakatime](https://wakatime.com/badge/user/018d87f9-d14a-41df-9a8a-08f8cff01174/project/6fbf530b-1bfc-47f7-ae38-5d984c4b2ce2.svg)](https://wakatime.com/badge/user/018d87f9-d14a-41df-9a8a-08f8cff01174/project/6fbf530b-1bfc-47f7-ae38-5d984c4b2ce2)

# Ubeer - Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

## Features

- Age verification popup with photo upload and face/age detection (Cloudinary + FaceAnalyzer API)
- Auth0 authentication (login/logout)
- Beer and brewery browsing
- Responsive design with TailwindCSS

## Age Verification

At first visit, a popup will ask the user to confirm their age (18+). Optionally, the user can verify their age by uploading or taking a photo. The photo is uploaded to Cloudinary and analyzed by the FaceAnalyzer API. If the estimated age is 18 or more, the user is redirected to Auth0 login. Otherwise, access is denied.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.