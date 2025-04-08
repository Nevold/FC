// import App from './components/app/app';
import './style.css';

// try {
//   await App.start();
// } catch (error) {
//   console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
// }

// Типы для наших сообщений (можно расширить по необходимости)
type WebSocketMessage = {
  id: string | null;
  type: string;
  payload: {
    // Request payload
  };
};

class WebSocketClient {
  private socket: WebSocket | undefined;

  private url: string;

  private reconnectAttempts: number = 0;

  private maxReconnectAttempts: number = 5;

  private reconnectInterval: number = 3000; // 3 секунды

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  // Установка соединения
  public connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', event => {
      console.log('WebSocket соединение установлено', event);
      this.reconnectAttempts = 0; // Сброс счетчика переподключений
      this.onOpen(event);
    });

    this.socket.onmessage = event => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.onMessage(message);
      } catch (error) {
        console.error('Ошибка парсинга сообщения', error);
      }
    };

    this.socket.onerror = event => {
      console.error('WebSocket ошибка', event);
      this.onError(event);
    };

    this.socket.onclose = event => {
      console.log('WebSocket соединение закрыто', event);
      this.onClose(event);

      // Попытка переподключения
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts += 1;
        console.log(`Попытка переподключения ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  // Отправка сообщения
  public send(message: WebSocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket не подключен');
      // Можно добавить сообщение в очередь для отправки после подключения
    }
  }

  // Закрытие соединения
  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Методы для переопределения (хуки)
  protected onOpen(_event: Event): void {
    // Можно переопределить в наследнике
  }

  protected onMessage(message: WebSocketMessage): void {
    // Можно переопределить в наследнике
    console.log('Получено сообщение:', message);
  }

  protected onError(event: Event): void {
    // Можно переопределить в наследнике
  }

  protected onClose(event: CloseEvent): void {
    // Можно переопределить в наследнике
  }
}

// start

// const ws = new WebSocketClient('http://127.0.0.1:4000');
// ws.connect();

// Расширяем базовый класс для конкретного использования
class ChatWebSocketClient extends WebSocketClient {
  constructor(url: string) {
    super(url);
  }

  // Отправка сообщения чата
  public sendMessage(_text: string): void {
    this.send({
      id: 'string | null',
      type: 'string',
      payload: {
        // Request payload
      }
    });
  }

  // Обработка входящих сообщений
  protected onMessage(message: WebSocketMessage): void {
    super.onMessage(message);

    switch (message.type) {
      case 'chat_message':
        console.log('Новое сообщение чата:', message);
        // Здесь можно обновить UI
        break;
      case 'user_joined':
        console.log('Пользователь присоединился:', message);
        break;
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
      id: 'string | null',
      type: 'string',
      payload: {
        // Request payload
      }
    });
  }
}

// Использование
const chatClient = new ChatWebSocketClient('ws://127.0.0.1:4000');

// Отправка сообщения через 5 секунд
setTimeout(() => {
  chatClient.sendMessage('Привет, мир!');
}, 5000);

// Закрытие соединения через 30 секунд
setTimeout(() => {
  chatClient.close();
}, 30000);

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
