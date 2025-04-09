import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly garageMenuButton = new BaseComponent(
    ['button', 'menu-button', 'active-menu-button', 'active-button'],
    'button',
    'To garage',
    { id: 'garage-menu' }
  ).getNode();

  public static readonly winnerMenuButton = new BaseComponent(
    ['button', 'menu-button', 'active-menu-button'],
    'button',
    'To winners',
    { id: 'winner-menu' }
  ).getNode();

  public static readonly winnerGarageWrapper = new BaseComponent('menu', 'div').getNode();

  public static readonly garagePageWrapper = new BaseComponent('', 'div', '', {
    id: 'garage-page'
  }).getNode();

  public static readonly winnerPage = new BaseComponent('disable-page', 'div', '', {
    id: 'winner'
  }).getNode();

  public static readonly paginationWrapper = new BaseComponent('pagination', 'div').getNode();

  public static readonly prevButton = new BaseComponent(['button', 'menu-button', 'prev-btn'], 'button', 'Prev', {
    id: 'prev'
  }).getNode();

  public static readonly nextButton = new BaseComponent(['button', 'menu-button', 'next-btn'], 'button', 'Next', {
    id: 'next'
  }).getNode();

  // ****************************************
  public static readonly loginContainer = new BaseComponent('login-container', 'div').getNode();

  public static readonly h2 = new BaseComponent('', 'h2', 'Authorization').getNode();

  public static readonly form = new BaseComponent('', 'form').getNode();

  public static readonly formGroupForUsername = new BaseComponent('form-group', 'div').getNode();

  public static readonly formGroupForPassword = new BaseComponent('form-group', 'div').getNode();

  public static readonly labelForUsername = new BaseComponent('', 'label', 'Username', { for: 'username' }).getNode();

  public static readonly labelForPassword = new BaseComponent('', 'label', 'Password', { for: 'password' }).getNode();

  public static readonly inputUsername = new BaseComponent('', 'input', '', {
    type: 'text',
    id: 'username',
    name: 'username',
    required: ''
  }).getNode();

  public static readonly inputPassword = new BaseComponent('', 'input', '', {
    type: 'text',
    id: 'password',
    name: 'password',
    required: ''
  }).getNode();

  public static readonly loginButton = new BaseComponent('login-button', 'button', 'Log In').getNode();
}
