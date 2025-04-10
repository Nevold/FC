import { Nodes } from '../view/nodes';
import { updateWinnerPage } from '../view/winners-pages/update-winners';

export function routing(): void {
  const garageControl = Nodes.garageMenuButton;
  const winnerControl = Nodes.winnerMenuButton;
  const garagePage = Nodes.garagePageWrapper;
  const { winnerPage } = Nodes;
  const buttonList = Nodes.prevButton;

  garageControl?.addEventListener('click', () => {
    garageControl?.classList.add('active-button');
    winnerControl?.classList.remove('active-button');
    garagePage?.classList.remove('disable-page');
    winnerPage?.classList.add('disable-page');
    buttonList?.classList.remove('winners-page');
    buttonList?.nextElementSibling?.classList.remove('winners-page');
  });

  winnerControl?.addEventListener('click', () => {
    garageControl?.classList.remove('active-button');
    winnerControl?.classList.add('active-button');
    garagePage?.classList.add('disable-page');
    winnerPage?.classList.remove('disable-page');
    buttonList?.classList.add('winners-page');
    buttonList?.nextElementSibling?.classList.add('winners-page');
    (async (): Promise<void> => {
      try {
        await updateWinnerPage();
      } catch (error) {
        console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
      }
    })().catch(error => {
      console.error('Error handling click:', error);
    });
  });
}
