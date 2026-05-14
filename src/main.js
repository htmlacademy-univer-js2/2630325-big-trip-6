import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import { render } from './framework/render.js';
import { AUTH_TOKEN, SERVER_URL } from './const.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const staticNewEventButtonElement = tripMainElement.querySelector('.trip-main__event-add-btn');

if (staticNewEventButtonElement) {
  staticNewEventButtonElement.remove();
}

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(SERVER_URL, AUTH_TOKEN),
});

const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainElement,
  pointsModel,
});

const filterPresenter = new FilterPresenter({
  container: filtersElement,
  filterModel,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: newPointFormCloseHandler,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: newPointButtonClickHandler,
});

function newPointFormCloseHandler() {
  newPointButtonComponent.setDisabled(false);
}

function newPointButtonClickHandler() {
  boardPresenter.createPoint();
  newPointButtonComponent.setDisabled(true);
}

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

newPointButtonComponent.setDisabled(true);
render(newPointButtonComponent, tripMainElement);

pointsModel.init().finally(() => {
  newPointButtonComponent.setDisabled(false);
});
