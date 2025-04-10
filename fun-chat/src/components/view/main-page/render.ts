import { Nodes } from '../nodes';

export function render(): void {
  const root = document.createElement('div');
  root.classList.add('root');
  document.body.append(root);

  const garageInnerHtml = `
    <div class="winner-message"></div>  
    <div>
      <form class="form" id="create-cars">
        <input class="input create-name" id="create-name" name="name" type="text" autocomplete="off" />
        <input class="input create-color" id="create-color" name="color" type="color" value="#ffffff" />
        <button class="button create-submit" id="create-submit" type="submit">Create</button>
      </form>
      <form class="form" id="update-cars">
        <input class="input update-name" id="update-name" name="name" type="text" autocomplete="off" disabled />
        <input class="input update-color" id="update-color" name="color" type="color" value="#ffffff" disabled />
        <button class="button update-submit" id="update-submit" type="submit">Update</button>
      </form>
    </div>
    <div class="drive-control">
      <button class="button menu-button active-button race" id="race">Race</button>
      <button class="button menu-button reset" id="reset" disabled>Reset</button>
      <button class="button generate" id="generate">Generate cars</button>
    </div>
    <div id="garage"></div>
    <div><p class="message" id="message"></p></div>
   `;

  root.append(Nodes.winnerGarageWrapper, Nodes.garagePageWrapper, Nodes.winnerPage, Nodes.paginationWrapper);
  Nodes.garagePageWrapper.insertAdjacentHTML('afterbegin', garageInnerHtml);
  Nodes.winnerGarageWrapper.append(Nodes.garageMenuButton, Nodes.winnerMenuButton);
  Nodes.paginationWrapper.append(Nodes.prevButton, Nodes.nextButton);
}
