import { Nodes } from '../nodes';
import './style.css';

class AuthenticationPage {
  public static readonly view = (): void => {
    document.body.append(Nodes.loginContainer);
    Nodes.loginContainer.append(Nodes.h2, Nodes.form);
    Nodes.form.append(Nodes.formGroupForUsername, Nodes.formGroupForPassword, Nodes.loginButton);
    Nodes.formGroupForUsername.append(Nodes.labelForUsername, Nodes.inputUsername);
    Nodes.formGroupForPassword.append(Nodes.labelForPassword, Nodes.inputPassword);
  };
}

export default AuthenticationPage;
