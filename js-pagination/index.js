document.getElementById('header').innerHTML = 'Pagination';

var itemsOnPage = 3;

$.ajax({
  url: './public/data.json',
  success: function(result){
    createList(result);
    createPagination(result);

  }});

function createList(data) {
  var p = '';
  for (var i = 0; i < data.users.length / itemsOnPage; i++) {
    p = p + '<p>' + data.users[i].id + '. ' + data.users[i].firstName + ' ' + data.users[i].lastName + '</p>';
  }
  document.getElementById('list').innerHTML = p;
}

var currentPage = 1;
function createPagination(data) {
  var a = '';
  for (var i = 1; i <= data.users.length / itemsOnPage; i++) {
    if (currentPage === i) {
      a = a + '<a href="#" class="active" onclick="onPageClick(this)">' + i + '</a>';
    } else {
      a = a + '<a href="#" class="" onclick="onPageClick(this)">' + i + '</a>';
    }
  }
  document.getElementById('pagination').innerHTML = a;
}

function onPageClick(obj) {
  currentPage = obj.innerText;
  obj.className = 'active';
}

