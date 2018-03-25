$('#header').html('<h2>Pagination</h2>');

var limit = 3;
var data = [];

async function fetchData() {
  var res = await fetch('data.json');
  data = await res.json();
  renderList(1);
  renderPagination(1);
}
fetchData();

function renderList(currentPage) {
  var startIndex = currentPage * limit - limit;
  var endIndex = currentPage * limit;
  var itemsOnPage = data.users.slice(startIndex, endIndex);

  var html = '';
  for (var i = 0; i < itemsOnPage.length; i++) {
    html = html + '<p>' + itemsOnPage[i].id + '. ' + itemsOnPage[i].firstName + ' '
      + itemsOnPage[i].lastName + '</p>';
  }
  $('#list').html(html);
}

function renderPagination(currentPage) {
  var html = '';
  for (var i = 1; i <= Math.ceil(data.users.length / limit); i++) {
    var classActive = currentPage === i ? 'class=active' : '';
    html = html + '<a href="#" ' + classActive + '>' + i + '</a>';
  }
  $('#pagination').html(html);

  $("a").on("click", function(){
    var page = parseFloat($(this).text());
    renderList(parseFloat(page));
    renderPagination(page);
  });
}


