export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return (res.ok ? res.json() : Promise.reject('Error!' + res.statusText));
  }

  /**
   * Loading Cards from the Server
   */
  getInitialCards() {
    return fetch(this._baseUrl + '/budgets', {
      headers: this._headers
    })
    .then(res => this._checkResult(res))
  }

   /**
   * Loading User Information from the Server
   */
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => this._checkResult(res))
  }


  /**
   * Get all cards and user infos and only then render them
   */
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  /**
   * Adding a New Budget
   */
  addBudget({name, link}) {
    return fetch(this._baseUrl + '/budgets', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link })
    })
    .then(res => this._checkResult(res))
  }

   /**
    * Deleting a resource
    */
  removeCard(cardId) {
    return fetch(this._baseUrl + '/budgets/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
    .then(res => this._checkResult(res))
  }

  //Adding and Removing Likes
  addLike(cardId) {
    return fetch(this._baseUrl + '/budgets/' + cardId + '/likes', {
      headers: this._headers,
      method: "PUT"
    })
    .then(res =>this._checkResult(res))
  }
  removeLike(cardId) {
    return fetch(this._baseUrl + '/budgets/' + cardId + '/likes', {
      headers: this._headers,
      method: "DELETE"
    })
    .then(res => this._checkResult(res))
  }

  saveBudget(budget) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      // body: JSON.stringify(article)
      body: JSON.stringify({
        description: budget.description,
        keyword: budget.keyword,
        publishedAt: budget.publishedAt,
        source: budget.source,
        title: budget.title,
        url: budget.url,
        urlToImage: budget.urlToImage
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
  }

  deleteBudget(budgetId) {
    return fetch(`${this._baseUrl}/articles/${budgetId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
  }
}


