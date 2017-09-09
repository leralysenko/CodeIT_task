// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

let map = new Map();
var data;
var cur; //хранится выбранное значение на диаграмме
// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL
xhr.open('GET', 'http://codeit.pro/frontTestTask/company/getList', false);

// 3. Отсылаем запрос
xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  	response = JSON.parse(xhr.responseText); 
		console.log(response); // responseText -- текст ответа.
		// заполняем 1 таблицу
		 $('.i1').replaceWith( "<h1>" + response.list.length);


		 //заполняем 2 таблицу
		 var div_list = document.createElement('div');
		 div_list.className = "panel-body text-center list-group";
		 div_list.id = "list_companies";
		 for (var i=0; i<response.list.length; i++) {
		 	var a = document.createElement('a');
		 	a.className = "list-group-item";
		 	a.href = "#";
		 	a.id = i;
		 	a.innerHTML = response.list[i].name;
		 	div_list.appendChild(a);
		 };

		$('.list-group').replaceWith( div_list);

		//заполняем 3 таблицу
		var k;

		for (var i=0; i<response.list.length; i++) {
			if (map.has(response.list[i].location.name)) { k = map.get(response.list[i].location.name) +1; map.set(response.list[i].location.name, k);}
			else { map.set(response.list[i].location.name, 1); }
		}
}
function drawChart() {
			var mapIter1 = map.keys();
			var mapIter2 = map.values();
	        // Create the data table.
	        data = new google.visualization.DataTable();
	        data.addColumn('string', 'Country');
	        data.addColumn('number', 'Count');
	        data.addRows(map.size);
	        for (var i = 0; i < map.size; i++) {
	        	data.setCell(i, 0, mapIter1.next().value);
	        	data.setCell(i, 1, mapIter2.next().value);
	        }
	        console. log(data);
	        // Set chart options
	        var options = {'title':'',
	                       'width':400,
	                       'height':200};

	        // Instantiate and draw our chart, passing in some options.
	        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	        chart.draw(data, options);
			
			google.visualization.events.addListener(chart, 'select', myClickHandler);
			function myClickHandler(){
				var selection = chart.getSelection();
				mapIter1 = map.keys();
				console.log(selection[0].row);
				for (var i = 0; i <= selection[0].row; i++) {
					var cur = mapIter1.next().value;
				}
				console.log(cur);

				var title_country = document.getElementById('title_country');
				title_country.innerHTML = "Companies By Location";
				var span = document.createElement('span');
				var a_btn = document.createElement('a');
				a_btn.href = "#";
				a_btn.className = "btn_back";
				span.className = "glyphicon glyphicon-arrow-left";
				a_btn.appendChild(span);
				title_country.appendChild(a_btn);
				var listcountry = document.createElement('div');
				 listcountry.className = "panel-body text-center list-group";
				 for (var i=0; i<response.list.length; i++) {
				 	var a = document.createElement('a');
				 	a.className = "list-group-item";
				 	//a.href = "#";
				 	if (response.list[i].location.name === cur) {
					 	a.innerHTML = response.list[i].name;
					 	listcountry.appendChild(a);
				 	}
				 };

				var div_chart = document.getElementById('chart_div');
				$('#chart_div').replaceWith( listcountry);	
				//a_btn.href = "#";
				a_btn.id = 'back_btn';
				$("#back_btn").on('click', function() {
    				$(listcountry).replaceWith( div_chart);
    				var title_country = document.getElementById('title_country');
    				title_country.innerHTML = "Companies By Location";
    				console.log(1);
				});
			}
}

var link;
var div_partners = document.getElementById('list_partners');
var ul_name = document.createElement('ul');
var ul_value = document.createElement('ul');

var arr = [];
var arr_clone =[];
//открытие блока Company Partners
$('#list_companies').on('click', 'a', function (event) {
	document.getElementById('all_partners').style.display='block';
	link = $(this).attr('id');

    for (var i = 0; i < response.list[link].partners.length; i++) {
    	arr[i] = response.list[link].partners[i].name;
    }
    for (var i = 0; i < response.list[link].partners.length; i++) {
    	arr_clone[i] = response.list[link].partners[i].name;
    }
    //sortName(arr, arr_clone);
    div_partners.innerHTML = "";
    visual(link);
    
})	

function visual (link) {
	div_partners.innerHTML = "";
	ul_name.innerHTML = "";
	ul_value.innerHTML = "";
	for (var i = 0; i < response.list[link].partners.length; i++) {
		    var li_cur1 = document.createElement('li');
		    li_cur1.className = "pat_value";
		    li_cur1.innerHTML = "";
		    li_cur1.innerHTML = response.list[link].partners[i].value;
			ul_value.appendChild(li_cur1);
	}
	div_partners.appendChild(ul_value);
	for (var i = 0; i < response.list[link].partners.length; i++) {
		   	var li_cur2 = document.createElement('li');
		   	li_cur2.innerHTML = "";
		    li_cur2.innerHTML = response.list[link].partners[i].name;
			ul_name.appendChild(li_cur2);
	}
	div_partners.appendChild(ul_name);
}

function sortName (arr, arr_clone) {
	div_partners.innerHTML = "";
	ul_name.innerHTML = "";
	ul_value.innerHTML = "";
	arr.sort();
	console.log(arr);
	for (var i = 0; i < response.list[link].partners.length; i++) {
		    var li_cur1 = document.createElement('li');
		    li_cur1.className = "pat_value";
		    li_cur1.innerHTML = "";
		    var k = find(arr_clone, arr[i]);
		    console.log(k);
		    li_cur1.innerHTML = response.list[link].partners[k].value;
			ul_value.appendChild(li_cur1);
	}
	div_partners.appendChild(ul_value);

	for (var i = 0; i < arr.length; i++) {
		   	var li_cur2 = document.createElement('li');
		   	li_cur2.innerHTML = "";
		    li_cur2.innerHTML = arr[i];
			ul_name.appendChild(li_cur2);
	}
	div_partners.appendChild(ul_name);
}

function find(array, value) {

  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }

  return -1;
}
