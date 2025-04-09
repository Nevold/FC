import WebSocketClient from './web-socket-client';

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

export default ChatClient;
