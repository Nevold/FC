// import App from './components/app/app';
import WebSocketClient from './components/api-services/api2';
import type { WebSocketMessage } from './components/types/types';
import './style.css';

// try {
//   await App.start();
// } catch (error) {
//   console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
// }

// start

// const ws = new WebSocketClient('http://127.0.0.1:4000');
// ws.connect();

// Расширяем базовый класс для конкретного использования
class ChatWebSocketClient extends WebSocketClient {
  // Отправка сообщения чата
  public sendMessage(_text: string): void {
    this.send({
      id: 'null',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: 'string',
          password: 'STring'
        }
      }
    });
  }

  // Обработка входящих сообщений
  protected onMessage(message: WebSocketMessage): void {
    super.onMessage(message);

    switch (message.type) {
      case 'chat_message': {
        console.log('Новое сообщение чата:', message);
        // Здесь можно обновить UI
        break;
      }
      case 'user_joined': {
        console.log('Пользователь присоединился:', message);
        break;
      }
      case 'user_left': {
        console.log('Пользователь вышел:', message);
        break;
      }
      default: {
        console.log('Неизвестный тип сообщения:', message);
      }
    }
  }

  protected onOpen(event: Event): void {
    super.onOpen(event);
    console.log('Чат подключен');
    // Можно отправить приветственное сообщение или запросить историю
    this.send({
      id: 'null',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: 'string',
          password: 'STring'
        }
      }
    });
  }
}

// Использование
const chatClient = new ChatWebSocketClient('ws://127.0.0.1:4000');

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
