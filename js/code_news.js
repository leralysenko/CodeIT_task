// 1. Создаём новый объект XMLHttpRequest
var xhr2 = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL
xhr2.open('GET', 'http://codeit.pro/frontTestTask/news/getList', false);

// 3. Отсылаем запрос
xhr2.send();

var response2;
var div_carousel = document.getElementById('carousel');

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr2.status != 200) {
  // обработать ошибку
  alert( xhr2.status + ': ' + xhr2.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  	response2 = JSON.parse(xhr2.responseText); 
		console.log(response2); // responseText -- текст ответа
		div_carousel.innerHTML = "";
	}

$(document).ready(function(){
  $('.single-item').slick({
  		arrows: false,
  		dots: true,
  		slidesToShow: 1,
  		infinite: true
  	});
});



for (var i = 0; i < response2.list.length; i++) {
	var div_cur = document.createElement('div');
	var div_img = document.createElement('div');
	var div_text = document.createElement('div');
	div_id = document.createElement('div');
	var img = document.createElement('img');
	var h5 = document.createElement('h5');
	var a = document.createElement('a');
	var p_text = document.createElement('p');
	var j = 0;
	p_aut = document.createElement('p');
	p_date = document.createElement('p');
	img.src = response2.list[i].img;
	img.style.width = '100px'; 
	img.style.height = '100px';
	div_img.className = "imgtitle";
	div_img.appendChild(img);
	a.innerHTML = response2.list[i].link;
	a.href = response2.list[i].link;
	h5.appendChild(a);
	while(typeof(response2.list[i].description[j])!=='undefined' && j<100) {
		p_text.innerHTML += response2.list[i].description[j];
		j++;
	}
	if (typeof(response2.list[i].description[j])!=='undefined') {p_text.innerHTML += "...";}
	div_text.appendChild(h5);
	div_text.appendChild(p_text);
	div_text.className = "div_text";

	p_aut.innerHTML = "<strong>Author: </strong>" + response2.list[i].author;
	var day = new Date(response2.list[i].date * 1000).getUTCDate();
	var month = new Date(response2.list[i].date * 1000).getUTCMonth() + 1;
	var year = new Date(response2.list[i].date * 1000).getUTCFullYear();

	if (day < 10) {day = '0' + day;}
	if (month < 10) {month = '0' + month;}
	p_date.innerHTML = "<strong>Public: </strong>" + day + '.' + month + '.' + year;

	div_id.appendChild(p_aut);
	div_id.appendChild(p_date);
	div_id.className = "div_id";
	div_cur.appendChild(div_img);
	div_cur.appendChild(div_text);
	div_cur.appendChild(div_id);
	div_carousel.appendChild(div_cur);
}