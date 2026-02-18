import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(new FilterView(), tripControlsFilters);

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
});

boardPresenter.init();
