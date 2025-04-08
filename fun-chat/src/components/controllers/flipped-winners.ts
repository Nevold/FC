import { updateWinnerPage } from '../view/winners-pages/update-winners';

export function setFlippedWinners(): void {
  let numberPages = 1;
  document.body.addEventListener('click', event => {
    if (event.target instanceof HTMLElement) {
      const element = event.target;
      (async (): Promise<void> => {
        try {
          switch (true) {
            case element.classList.contains('next-btn') && element.classList.contains('winners-page'): {
              numberPages += 1;
              await updateWinnerPage(numberPages);
              break;
            }

            case element.classList.contains('prev-btn') &&
              element.classList.contains('winners-page') &&
              numberPages > 1: {
              numberPages -= 1;
              await updateWinnerPage(numberPages);
              break;
            }

            default: {
              break;
            }
          }
        } catch (error) {
          console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
        }
      })().catch(error => {
        console.error('Error handling click:', error);
      });
    }
  });
}
