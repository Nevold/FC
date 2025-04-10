import AuthenticationPage from '../view/authentication-page/authentication-page';
import { Nodes } from '../view/nodes';

class AuthenticationLogic {
  public static readonly showError = (field: string, message: string): void => {
    if (field === 'username') {
      Nodes.inputUsername.classList.add('input-error');
      Nodes.errorMessageForUsername.style.visibility = 'visible';
      Nodes.errorMessageForUsername.textContent = message;
    } else {
      Nodes.inputPassword.classList.add('input-error');
      Nodes.errorMessageForPassword.style.visibility = 'visible';
      Nodes.errorMessageForPassword.textContent = message;
    }
  };

  public static readonly resetErrors = (): void => {
    Nodes.inputUsername.classList.remove('input-error');
    Nodes.errorMessageForUsername.style.visibility = 'hidden';
    Nodes.errorMessageForUsername.textContent = '';

    Nodes.inputPassword.classList.remove('input-error');
    Nodes.errorMessageForPassword.style.visibility = 'hidden';
    Nodes.errorMessageForPassword.textContent = '';
  };

  public static readonly listener = (): void => {
    Nodes.form.addEventListener('submit', event => {
      event.preventDefault();

      this.resetErrors();

      const username = new FormData(Nodes.form).get('username');
      const password = new FormData(Nodes.form).get('password');

      let isValid = true;

      if (username === '') {
        this.showError('username', 'Enter username');
        isValid = false;
      } else if (typeof username === 'string' && username.length < 4) {
        this.showError('username', 'Username must be at least 4 characters');
        isValid = false;
      } else if (typeof username === 'string' && !/^[A-Za-z]+$/.test(username)) {
        this.showError('username', 'Username must contain only letters');
        isValid = false;
      }

      if (password === '') {
        this.showError('password', 'Enter password');
        isValid = false;
      } else if (typeof password === 'string' && (!/[a-z]/.test(password) || !/[A-Z]/.test(password))) {
        this.showError('password', 'The password must contain at least one lowercase and one uppercase letter.');
        isValid = false;
      } else if (typeof password === 'string' && password.length < 4) {
        this.showError('password', 'Password must be at least 4 characters');
        isValid = false;
      }

      if (isValid) {
        console.log(username, '!', password);
      }
    });
  };

  public static readonly start = (): void => {
    AuthenticationPage.view();
    this.listener();
  };
}

export default AuthenticationLogic;
