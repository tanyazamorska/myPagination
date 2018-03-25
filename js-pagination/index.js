document.getElementById('header').innerHTML = 'Pagination';

var limit = 3;
var data = [];

async function fetchData() {
  var res = await fetch('data.json');
  data = await res.json();
  renderList(1);
  renderPagination(1);
}
fetchData();

// fetch('data.json')
//   .then(function (res) { return res.json()})
//   .then(function (data) {
//     createList(data, 1);
//     createPagination(data, 1);
//   });

function renderList(currentPage) {
  var startIndex = currentPage * limit - limit;
  var endIndex = currentPage * limit;
  var itemsOnPage = data.users.slice(startIndex, endIndex);

  var html = '';
  for (var i = 0; i < itemsOnPage.length; i++) {
    html = html + '<p>' + itemsOnPage[i].id + '. ' + itemsOnPage[i].firstName + ' '
      + itemsOnPage[i].lastName + '</p>';
  }
  document.getElementById('list').innerHTML = html;
}

function renderPagination(currentPage) {
  var html = '';
  var classActive;

  for (var i = 1; i <= Math.ceil(data.users.length / limit); i++) {
    if (currentPage === i) {
      classActive = 'class=active';
    } else {
      classActive = '';
    }
    html = html + '<a href="#" ' + classActive + ' onclick="handleClick(this)">' + i + '</a>';
  }
  document.getElementById('pagination').innerHTML = html;
}

function handleClick(obj) {
  renderList(parseFloat(obj.innerText));
  renderPagination(parseFloat(obj.innerText));
}

