import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { render } from './framework/render.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
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

filterPresenter.init();
boardPresenter.init();
render(newPointButtonComponent, tripMainContainer);
