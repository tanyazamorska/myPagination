import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => this.fetchDataServer();

  handleChangePage = (event, page) => {
  console.log(page);
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  fetchDataServer = () => {
    fetch('data/data.json', {credentials: 'same-origin'})
      .then((res) => {return res.json()})
      .then(res => this.setState({data: res.data}))
      .catch(err => console.log(err))
  };

  renderPagination = () => {
    return (
      <div className="pagination">
        <a href="#">1</a>
        <a className="active" href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
      </div>
    );
  };

  render() {
    return (
      <div className="grid-container">
        {this.renderPagination()}
      </div>);
  }
}

export default App;
