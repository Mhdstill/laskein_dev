import { AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { BaseComponent } from '../base-page.component';

export abstract class BaseAuthComponent extends BaseComponent {}
