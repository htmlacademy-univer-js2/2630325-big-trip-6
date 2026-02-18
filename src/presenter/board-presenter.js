import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  constructor({ container }) {
    this.container = container;
    this.eventListComponent = new EventListView();
  }

  init() {
    render(new SortView(), this.container);

    render(this.eventListComponent, this.container);

    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
