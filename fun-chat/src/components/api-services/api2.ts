import type { WebSocketMessage } from '../types/types';

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

export default WebSocketClient;
