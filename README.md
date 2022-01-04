## About 
This codebase was created to demonstrate a pilot application for facial detection built with Angular and Angular Material that interacts with an actual Ruby on Rails backend server including CRUD operations, authentication, routing, pagination, and more.
## Requirements
- Node.js
- npm
- Angular CLI
## Getting started

```bash
# Clone the repo
git clone     
cd cloudview-angular-material    

# Install npm packages
npm install  

# Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files  
ng serve  

```
## Building the project

```bash

# Build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build
ng build

```
## Functionality overview
- Authenticate users via angular-token (login/signup/forgot-password pages)
- CRUD Users
- CRUD Cameras (Add Camera IP)
- CRUD Videos (File upload using ngx-dropzone-wrapper)
- GET and display all snapshots of facial detections sent from backend server