// import App from './components/app/app';
// import WebSocketClient from './components/api-services/api2';
// import type { WebSocketMessage } from './components/types/types';
import './style.css';

import WebSocketClient from './components/api-services/web-socket-client';
import { WebSocketClientConfig } from './components/types/types';

// // try {
// //   await App.start();
// // } catch (error) {
// //   console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
// // }

// // start

// // const ws = new WebSocketClient('http://127.0.0.1:4000');
// // ws.connect();

// // Расширяем базовый класс для конкретного использования
// class ChatWebSocketClient extends WebSocketClient {
//   // Отправка сообщения чата
//   public sendMessage(_text: string): void {
//     this.send({
//       id: 'null',
//       type: 'USER_LOGIN',
//       payload: {
//         user: {
//           login: 'string',
//           password: 'STring'
//         }
//       }
//     });
//   }

//   // Обработка входящих сообщений
//   protected onMessage(message: WebSocketMessage): void {
//     super.onMessage(message);

//     switch (message.type) {
//       case 'chat_message': {
//         console.log('Новое сообщение чата:', message);
//         // Здесь можно обновить UI
//         break;
//       }
//       case 'user_joined': {
//         console.log('Пользователь присоединился:', message);
//         break;
//       }
//       case 'user_left': {
//         console.log('Пользователь вышел:', message);
//         break;
//       }
//       default: {
//         console.log('Неизвестный тип сообщения:', message);
//       }
//     }
//   }

//   protected onOpen(event: Event): void {
//     super.onOpen(event);
//     console.log('Чат подключен');
//     // Можно отправить приветственное сообщение или запросить историю
//     this.send({
//       id: 'null',
//       type: 'USER_LOGIN',
//       payload: {
//         user: {
//           login: 'string',
//           password: 'STring'
//         }
//       }
//     });
//   }
// }

// // Использование
// const chatClient = new ChatWebSocketClient('ws://127.0.0.1:4000');

// Отправка сообщения через 5 секунд
// setTimeout(() => {
//   chatClient.sendMessage('Привет, мир!');
// }, 5000);

// // Закрытие соединения через 30 секунд
// setTimeout(() => {
//   chatClient.close();
// }, 30_000);

// очередь
// class WebSocketClientWithQueue extends WebSocketClient {
//   private messageQueue: WebSocketMessage[] = [];

//   protected onOpen(event: Event): void {
//     super.onOpen(event);
//     // Отправляем все сообщения из очереди
//     this.messageQueue.forEach(message => this.send(message));
//     this.messageQueue = [];
//   }

//   public send(message: WebSocketMessage): void {
//     if (this.socket && this.socket.readyState === WebSocket.OPEN) {
//       super.send(message);
//     } else {
//       console.log('Сообщение добавлено в очередь');
//       this.messageQueue.push(message);
//     }
//   }
// }

// ping
// class WebSocketClientWithPing extends WebSocketClient {
//   private pingInterval: number = 30000; // 30 секунд
//   private pingTimer?: number;

//   protected onOpen(event: Event): void {
//     super.onOpen(event);
//     // Запускаем пинг
//     this.pingTimer = window.setInterval(() => {
//       this.send({ type: 'ping' });
//     }, this.pingInterval);
//   }

//   protected onClose(event: CloseEvent): void {
//     super.onClose(event);
//     // Очищаем таймер
//     if (this.pingTimer) {
//       clearInterval(this.pingTimer);
//     }
//   }
// }

// ChatClient.ts

// Создаем конкретную реализацию для чата
class ChatClient extends WebSocketClient {
  // constructor(url: string) {
  //   super(url);
  // }

  protected onOpen(): void {
    console.log('Chat connected!');
    this.send({
      id: 'string',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: 'string',
          password: 'string'
        }
      }
    });
  }

  protected onMessage(data: unknown): void {
    if (typeof data === 'object' && data !== null) {
      const message = data as { type: string; content?: string };

      switch (message.type) {
        case 'chat': {
          if (message.content) {
            this.displayMessage(message.content);
          }
          break;
        }
        case 'notification': {
          console.log('Notification:', message);
          break;
        }
        default: {
          console.log('Unknown message type:', message);
        }
      }
    }
  }

  protected onError(error: Event): void {
    console.error('Chat error:', error);
    this.showStatus('Connection error');
  }

  protected onClose(event: CloseEvent): void {
    this.showStatus(`Disconnected (${event.code})`);
  }

  public sendMessage(text: string): void {
    // this.send({ type: 'chat', content: text });
    console.log(this);
    this.send({ type: 'chat', content: text });
  }

  private displayMessage(text: string): void {
    const messagesDiv = document.querySelector('#messages');
    if (messagesDiv) {
      const messageElement = document.createElement('div');
      messageElement.textContent = text;
      messagesDiv.append(messageElement);
    }
  }

  private showStatus(text: string): void {
    const statusDiv = document.querySelector('#status');
    if (statusDiv) {
      statusDiv.textContent = text;
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Создаем клиент (используйте ваш реальный WebSocket URL)
  const chatClient = new ChatClient('ws://127.0.0.1:4000');

  // Обработчики UI
  const sendButton = document.querySelector('#sendButton');
  const messageInput = document.querySelector('#messageInput') as HTMLInputElement;

  sendButton?.addEventListener('click', () => {
    if (messageInput.value.trim()) {
      chatClient.sendMessage(messageInput.value);
      messageInput.value = '';
    }
  });

  messageInput?.addEventListener('keypress', e => {
    if (e.key === 'Enter' && messageInput.value.trim()) {
      chatClient.sendMessage(messageInput.value);
      messageInput.value = '';
    }
  });
});
