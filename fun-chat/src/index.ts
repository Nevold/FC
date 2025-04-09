import AuthenticationClient from './components/api-services/authentication-client';
import './style.css';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Создаем клиент (используйте ваш реальный WebSocket URL)
  const authenticationClient = new AuthenticationClient('ws://127.0.0.1:4000');
  authenticationClient.connect();

  // // Обработчики UI
  // const sendButton = document.querySelector('#sendButton');
  // const messageInput = document.querySelector<HTMLInputElement>('#messageInput');

  // sendButton?.addEventListener('click', () => {
  //   if (messageInput.value.trim()) {
  //     chatClient.sendMessage(messageInput.value);
  //     messageInput.value = '';
  //   }
  // });

  // messageInput?.addEventListener('keypress', e => {
  //   if (e.key === 'Enter' && messageInput.value.trim()) {
  //     chatClient.sendMessage(messageInput.value);
  //     messageInput.value = '';
  //   }
  // });
});
