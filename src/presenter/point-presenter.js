import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../const.js';

export default class PointPresenter {
  #container = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destinations = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({ container, offers, destinations, onDataChange, onModeChange }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const previousPointComponent = this.#pointComponent;
    const previousPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#editClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#pointEditComponent = new EventEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#formSubmitHandler,
      onDeleteClick: this.#deleteClickHandler,
      onCloseClick: this.#closeClickHandler,
    });

    if (!previousPointComponent || !previousPointEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, previousPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    this.#pointEditComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

    this.#pointEditComponent.shake();
  }

  #replacePointToForm() {
    this.#handleModeChange();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #formSubmitHandler = (updatedPoint) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      updatedPoint
    );
  };

  #deleteClickHandler = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #closeClickHandler = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };
}
