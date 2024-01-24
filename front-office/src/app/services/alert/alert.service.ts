import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(alertType: string, alertContent: AlertContent) {
    switch (alertType) {
      case AlertType.SUCCESS:
        Swal.fire({
          title: `<strong>${alertContent.header}</strong>`,
          icon: 'success',
          html: alertContent.body,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'OK',
          confirmButtonAriaLabel: '',
        });
        break;

      case AlertType.ERROR:
        Swal.fire({
          icon: 'error',
          title: `<strong>${alertContent.header}</strong>`,
          text: alertContent.body,
          footer: alertContent.footer,
        });
        break;
    }
  }
}

export enum AlertType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AlertContent {
  header: string;
  body: string;
  footer?: string;
}
