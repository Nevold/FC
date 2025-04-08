class WebSocketClient {
  private socket: WebSocket | null = null;

  private url: string;

  private reconnectAttempts: number = 0;

  private maxReconnectAttempts: number = 5;

  private reconnectDelay: number = 3000;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.onOpen();
    };

    this.socket.onmessage = event => {
      try {
        const data = this.parseMessage(event.data);
        this.onMessage(data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.socket.onerror = error => {
      console.error('WebSocket error:', error);
      this.onError(error);
    };

    this.socket.onclose = event => {
      console.log('WebSocket closed:', event.code, event.reason);
      this.onClose(event);

      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnect();
      }
    };
  }

  private parseMessage(data: string): unknown {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  private reconnect(): void {
    this.reconnectAttempts += 1;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      this.connect();
    }, this.reconnectDelay);
  }

  public send(data: unknown): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const message = typeof data === 'string' ? data : JSON.stringify(data);
    this.socket.send(message);
  }

  public close(code?: number, reason?: string): void {
    this.socket?.close(code, reason);
  }

  // Методы для переопределения в наследниках
  protected onOpen(): void {}

  protected onMessage(data: unknown): void {}

  protected onError(error: Event): void {}

  protected onClose(event: CloseEvent): void {}
}

export default WebSocketClient;
