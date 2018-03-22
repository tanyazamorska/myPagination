import React from 'react';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      limitItemsOfPage: null,
      totalItems: null
    }
  }

  componentDidMount = () => this.fetchDataServer();

  onPageClick = page => this.setState({currentPage: page});

  fetchDataServer = () =>
    fetch('data/data.json', {credentials: 'same-origin'})
      .then((res) => {return res.json()})
      .then(res => this.setState({
        data: res.data,
        limitItemsOfPage: res.pagination.limit,
        totalItems: res.pagination.total
      }))
      .catch(err => console.log(err));

  renderPagination = () => {
    const pages =_.range(1, this.state.totalItems / this.state.limitItemsOfPage + 1);

    return pages.map((page) => (
      <div className="pagination" key={page}>
        <a
          className={this.state.currentPage === page ? 'active' : ''}
          onClick={() => this.onPageClick(page)}
        >{page}
        </a>
      </div>));
  };

  renderContent = (data) => {
    let startIndex;
    let endIndex;
    if (this.state.currentPage === 1) {
      startIndex = 0;
      endIndex = this.state.limitItemsOfPage;
    } else {
      startIndex = this.state.currentPage  * this.state.limitItemsOfPage - this.state.limitItemsOfPage;
      endIndex = this.state.currentPage * this.state.limitItemsOfPage;
    }

    const pageOfItems = data.slice(startIndex, endIndex);

    return pageOfItems.map((item) => (
      <p key={item.id}>{`${item.id}.  ${item.firstName} ${item.lastName}`}</p>)
    )
  };

  render() {
    return (
      <div className="grid-container">
        <div className="item1">
          <h1>Content</h1>
          {this.renderContent(this.state.data)}
        </div>
        <div className="item2">
          {this.renderPagination()}
        </div>
      </div>);
  }
}

export default App;
