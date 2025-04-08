import EngineServices from '../api-services/engine-services';
import { Nodes } from '../view/nodes';
import { Constants } from './constants';

const modelCars = ['Toyota', 'Mercedes', 'BMW', 'Honda', 'Volkswagen', 'Ford', 'Hyundai', 'Audi', 'Porsche', 'Nissan'];
const modelNames = ['rav4', 's600', '3', 'accord', 'golf', 'mondeo', 'i30', 'q5', 'cayenne'];

function getRandomName(): string {
  const modelCar = modelCars[Math.floor(Math.random() * modelCars.length)];
  const modelName = modelNames[Math.floor(Math.random() * modelNames.length)];
  return `${modelCar} ${modelName}`;
}

function getRandomColor(): string {
  let hash = '#';
  for (let index = 0; index < Constants.COLOR_LIMIT; index += 1) {
    hash += Constants.SIMBOL[Math.floor(Math.random() * Constants.SIMBOL.length)];
  }
  return hash;
}

export function generateCars(count = Constants.CAR_LIMIT): {
  name: string;
  color: string;
}[] {
  return Array.from({ length: count })
    .fill({})
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));
}

export async function animation(
  currentCar: HTMLElement | null,
  _: number,
  animationTime: number,
  carId = -1
): Promise<boolean | undefined> {
  let start: null | number;
  const DRAG_COEFFICIENT = 250;
  let successAnimationCarId: number;
  let windowSize = window.innerWidth;
  window.addEventListener('resize', () => {
    windowSize = window.innerWidth;
    return windowSize;
  });
  function step(timestamp: number): void {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passedPath = Math.round((time * (windowSize - DRAG_COEFFICIENT)) / animationTime);
    if (currentCar) currentCar.style.transform = `translateX(${Math.min(passedPath, windowSize - DRAG_COEFFICIENT)}px)`;
    if (passedPath < windowSize - DRAG_COEFFICIENT && currentCar?.classList.contains('in-transit')) {
      successAnimationCarId = globalThis.requestAnimationFrame(step);
    }
  }
  successAnimationCarId = globalThis.requestAnimationFrame(step);

  if (carId !== -1) {
    const driveResult = await EngineServices.isSuccessDriveCar(carId);
    const successAnimationCar = driveResult.success;
    if (!successAnimationCar) {
      globalThis.cancelAnimationFrame(successAnimationCarId);
    }
    return successAnimationCar;
  }
  return undefined;
}

export function disableAllControlButton(element: HTMLElement | HTMLButtonElement): void {
  const controlButtonsList = document.querySelectorAll<HTMLDivElement>('.control-button');
  const generateButton = document.querySelector<HTMLButtonElement>('#generate');
  const updateButton = document.querySelector<HTMLButtonElement>('#update-submit');
  const createButton = document.querySelector<HTMLButtonElement>('#create-submit');
  const { nextButton } = Nodes;
  const previousButton = Nodes.prevButton;
  if (generateButton && updateButton && createButton) {
    if (element.classList.contains('race')) {
      generateButton.disabled = true;
      updateButton.disabled = true;
      createButton.disabled = true;
      previousButton.disabled = true;
      nextButton.disabled = true;
      generateButton.classList.add('button-disabled');
      updateButton.classList.add('button-disabled');
      createButton.classList.add('button-disabled');
      previousButton.classList.add('button-disabled');
      nextButton.classList.add('button-disabled');
    }
    if (element.classList.contains('reset')) {
      generateButton.disabled = false;
      updateButton.disabled = false;
      createButton.disabled = false;
      previousButton.disabled = false;
      nextButton.disabled = false;
      generateButton.classList.remove('button-disabled');
      updateButton.classList.remove('button-disabled');
      createButton.classList.remove('button-disabled');
      previousButton.classList.remove('button-disabled');
      nextButton.classList.remove('button-disabled');
    }
  }

  [...controlButtonsList].forEach(element_ => {
    const buttonElements = [...element_.children].filter(
      (child): child is HTMLButtonElement => child instanceof HTMLButtonElement
    );
    buttonElements.forEach(button => {
      if (element.classList.contains('race')) {
        button.disabled = true;
        button.classList.add('button-disabled');
      } else {
        button.disabled = false;
        button.classList.remove('button-disabled');
      }
    });
  });
  const startIconList = document.querySelectorAll<HTMLButtonElement>('.start-icon');
  [...startIconList].forEach(button => {
    if (element.classList.contains('race')) {
      button.disabled = true;
      button.classList.remove('active-icon');
    } else {
      button.disabled = false;
      button.classList.add('active-icon');
    }
  });
}

export function disabledRaceButton(element: HTMLElement): void {
  const raceButton = document.querySelector<HTMLButtonElement>('#race');
  const stopCarButtonList = document.querySelectorAll<HTMLDivElement>('.stop-icon');
  const { classList } = element;
  const qtMoveCars = [...stopCarButtonList].filter(element_ => element_.classList.contains('active-icon')).length;
  if (classList.contains('start-icon') && raceButton) {
    raceButton?.classList.remove('active-button');
    raceButton.disabled = true;
  }
  if (classList.contains('stop-icon') && qtMoveCars === 0 && raceButton) {
    raceButton?.classList.add('active-button');
    raceButton.disabled = false;
  }
  if (
    classList.contains('remove-car') ||
    classList.contains('create-submit') ||
    classList.contains('update-flag') ||
    classList.contains('generate') ||
    classList.contains('prev-btn') ||
    classList.contains('next-btn')
  ) {
    raceButton?.classList.add('active-button');
    if (raceButton) {
      raceButton.disabled = false;
    }
  }
}
