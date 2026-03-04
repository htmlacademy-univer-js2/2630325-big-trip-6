import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.eventListComponent = new EventListView();
  }

  init() {
    const points = this.pointsModel.points;
    const offers = this.pointsModel.offers;
    const destinations = this.pointsModel.destinations;

    render(new SortView(), this.container);
    render(this.eventListComponent, this.container);

    // Первая точка — форма редактирования
    render(
      new EventEditView({ point: points[0], offers, destinations }),
      this.eventListComponent.getElement()
    );

    // Остальные — обычные точки маршрута
    for (let i = 1; i < points.length; i++) {
      render(
        new EventView({ point: points[i], offers, destinations }),
        this.eventListComponent.getElement()
      );
    }
  }
}
