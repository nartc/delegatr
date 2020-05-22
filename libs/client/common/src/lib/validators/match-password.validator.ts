import { FormControl, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  passwordControlName: string = 'password'
): ValidatorFn {
  return (control: FormControl) => {
    const pwdControl = control.parent?.get(passwordControlName);

    if (pwdControl == null) {
      return null;
    }

    if (pwdControl.value !== control.value) {
      return { matchPassword: true };
    }

    return null;
  };
}
