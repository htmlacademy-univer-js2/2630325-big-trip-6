import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { render } from './framework/render.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

render(new FilterView(), tripControlsFilters);

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
});

boardPresenter.init();
