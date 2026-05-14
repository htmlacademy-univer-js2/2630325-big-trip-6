import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');

// Удаляем захардкоженную кнопку из HTML
const staticNewEventButton = tripMainContainer.querySelector('.trip-main__event-add-btn');
if (staticNewEventButton) {
  staticNewEventButton.remove();
}

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  container: tripControlsFilters,
  filterModel,
  pointsModel,
});

const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainContainer,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.setDisabled(true);
}

function handleNewPointFormClose() {
  newPointButtonComponent.setDisabled(false);
}

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

newPointButtonComponent.setDisabled(true);
render(newPointButtonComponent, tripMainContainer);

pointsModel.init().finally(() => {
  newPointButtonComponent.setDisabled(false);
});
