import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are NO other pages
    if (curPage === 1 && numPages === 1) return '';

    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev ${
      /* hide on the first page */
      curPage === 1 && numPages > 1 ? 'hidden' : ''
    }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>

    <div class="pagination__page">
      ${curPage} / ${numPages}
    </div>

    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next ${
      /* hide on the last page */
      curPage === numPages && numPages > 1 ? 'hidden' : ''
    }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
   `;
  }
}

export default new PaginationView();
