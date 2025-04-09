import { Nodes } from '../nodes';
import './style.css';

class AuthenticationPage {
  public static readonly view = (): void => {
    document.body.append(Nodes.loginContainer);
    Nodes.loginContainer.append(Nodes.h2, Nodes.form);
    Nodes.form.append(Nodes.formGroupForUsername, Nodes.formGroupForPassword, Nodes.loginButton);
    Nodes.formGroupForUsername.append(Nodes.labelForUsername, Nodes.inputUsername, Nodes.errorMessageForUsername);
    Nodes.formGroupForPassword.append(Nodes.labelForPassword, Nodes.inputPassword, Nodes.errorMessageForPassword);
  };
}

export default AuthenticationPage;

// <!DOCTYPE html>
// <html lang="ru">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Форма авторизации с валидацией</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             margin: 0;
//         }

//         .login-container {
//             background-color: white;
//             padding: 20px 30px;
//             border-radius: 8px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             width: 100%;
//             max-width: 400px;
//         }

//         .login-container h2 {
//             margin-bottom: 20px;
//             text-align: center;
//             color: #333;
//         }

//         .form-group {
//             margin-bottom: 15px;
//         }

//         .form-group label {
//             display: block;
//             margin-bottom: 5px;
//             color: #555;
//         }

//         .form-group input {
//             width: 100%;
//             padding: 10px;
//             border: 1px solid #ddd;
//             border-radius: 4px;
//             box-sizing: border-box;
//         }

//         .form-group input:focus {
//             border-color: #007bff;
//             outline: none;
//         }

//         .login-button {
//             width: 100%;
//             padding: 10px;
//             background-color: #007bff;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             font-size: 16px;
//         }

//         .login-button:hover {
//             background-color: #0056b3;
//         }

//         .forgot-password {
//             text-align: center;
//             margin-top: 10px;
//         }

//         .forgot-password a {
//             color: #007bff;
//             text-decoration: none;
//         }

//         .forgot-password a:hover {
//             text-decoration: underline;
//         }

//         .error-message {
//             color: #dc3545;
//             font-size: 14px;
//             margin-top: 5px;
//             display: none;
//         }

//         .input-error {
//             border-color: #dc3545 !important;
//         }
//     </style>
// </head>
// <body>
//     <div class="login-container">
//         <h2>Авторизация</h2>
//         <form id="loginForm" novalidate>
//             <div class="form-group">
//                 <label for="username">Имя пользователя</label>
//                 <input type="text" id="username" name="username" required>
//                 <div class="error-message" id="username-error">Пожалуйста, введите имя пользователя</div>
//             </div>
//             <div class="form-group">
//                 <label for="password">Пароль</label>
//                 <input type="password" id="password" name="password" required minlength="6">
//                 <div class="error-message" id="password-error">Пароль должен содержать минимум 6 символов</div>
//             </div>
//             <button type="submit" class="login-button">Войти</button>
//             <div class="forgot-password">
//                 <a href="#">Забыли пароль?</a>
//             </div>
//         </form>
//     </div>

//     <script>
//         document.getElementById('loginForm').addEventListener('submit', function(e) {
//             e.preventDefault();

//             // Сбрасываем предыдущие ошибки
//             resetErrors();

//             // Получаем значения полей
//             const username = document.getElementById('username').value.trim();
//             const password = document.getElementById('password').value;

//             // Флаг валидности
//             let isValid = true;

//             // Валидация имени пользователя
//             if (username === '') {
//                 showError('username', 'Пожалуйста, введите имя пользователя');
//                 isValid = false;
//             }

//             // Валидация пароля
//             if (password === '') {
//                 showError('password', 'Пожалуйста, введите пароль');
//                 isValid = false;
//             } else if (password.length < 6) {
//                 showError('password', 'Пароль должен содержать минимум 6 символов');
//                 isValid = false;
//             }

//             // Если форма валидна, можно отправить данные
//             if (isValid) {
//                 alert('Форма валидна! Можно отправлять данные на сервер.');
//                 // Здесь обычно делается AJAX-запрос к серверу
//                 // this.submit(); // Раскомментировать для обычной отправки формы
//             }
//         });

//         // Функция для отображения ошибки
//         function showError(fieldId, message) {
//             const field = document.getElementById(fieldId);
//             const errorElement = document.getElementById(`${fieldId}-error`);

//             field.classList.add('input-error');
//             errorElement.textContent = message;
//             errorElement.style.display = 'block';
//         }

//         // Функция для сброса ошибок
//         function resetErrors() {
//             const errors = document.querySelectorAll('.error-message');
//             const inputs = document.querySelectorAll('input');

//             errors.forEach(error => {
//                 error.style.display = 'none';
//                 error.textContent = '';
//             });

//             inputs.forEach(input => {
//                 input.classList.remove('input-error');
//             });
//         }

//         // Добавляем валидацию при потере фокуса
//         document.getElementById('username').addEventListener('blur', function() {
//             if (this.value.trim() === '') {
//                 showError('username', 'Пожалуйста, введите имя пользователя');
//             }
//         });

//         document.getElementById('password').addEventListener('blur', function() {
//             if (this.value === '') {
//                 showError('password', 'Пожалуйста, введите пароль');
//             } else if (this.value.length < 6) {
//                 showError('password', 'Пароль должен содержать минимум 6 символов');
//             }
//         });
//     </script>
// </body>
// </html>
