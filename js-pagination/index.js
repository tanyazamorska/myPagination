document.getElementById('header').innerHTML = 'Pagination';

$.ajax({
  url: 'data.json',
  success: function(result){
    console.log(result);
  }});

var a = '';
for (var i = 0; i <= 10; i++) {
  a = a + '<a href="#">' + i + '</a> <br/>';
}

document.getElementById('list').innerHTML = a;
