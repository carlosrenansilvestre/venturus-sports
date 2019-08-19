import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  errors: any[] = [];

  constructor() { }

  formatErrors(errors) {
    var errorString = "";
    var errorMessage = "";

    errors.forEach((error, index) => {
      errorString += error;
      if (index == errors.length - 2) {
        errorString += " e ";
      } else if (index < errors.length - 1) {
        errorString += ", ";
      }
      
    });

    if (errors.length > 1) {
      errorMessage = `Os campos ${errorString} são obrigatórios!`;
    } else {
      errorMessage = `O campo ${errorString} é obrigatório!`;
    }

    return errorMessage;
  }

}
