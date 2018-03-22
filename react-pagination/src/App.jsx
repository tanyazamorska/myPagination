import React from 'react';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      limit: 3
    }
  }

  componentDidMount = () => this.fetchDataServer();

  onPageClick = page => this.setState({currentPage: page});

  fetchDataServer = () =>
    fetch('data/data.json')
      .then((res) => {return res.json()})
      .then(data => this.setState({data: data.data}))
      .catch(err => console.error(err));

  renderPagination = () => {
    const pages = _.range(1, this.state.data.length / this.state.limit + 1);

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
    const startIndex = this.state.currentPage * this.state.limit - this.state.limit;
    const endIndex = this.state.currentPage * this.state.limit;
    const itemsOnPage = data.slice(startIndex, endIndex);
    return itemsOnPage.map((item) =>
      <p key={item.id}>{`${item.id}.  ${item.firstName} ${item.lastName}`}</p>
    )
  };

  render() {
    return (
      <div className="grid-container">
        <div className="item1">
          <h1>Pagination</h1>
          {this.renderContent(this.state.data)}
        </div>
        <div className="item2">
          {this.renderPagination()}
        </div>
      </div>);
  }
}

export default App;
