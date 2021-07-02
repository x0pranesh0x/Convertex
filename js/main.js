//
//functions
//



async function currency_converter() {
	var input1 = document.getElementById("input-1");
	var input2 = document.getElementById("input-2");
	var dates_1 = document.getElementById("dates_1");
	var dates_2 = document.getElementById("dates_2");
	
	var option_1 = document.querySelector(".select_p_1").innerHTML.slice(this.length - 3);
	console.log(option_1);
	var option_2 = document.querySelector(".select_p_2").innerHTML.slice(this.length - 3);
	console.log(option_1);
	console.log(option_2);
	
	if (option_1 == option_2){
		input2.value = input1.value;
	}
	
	else{
		var url = `https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USD${option_1},USD${option_2}`;
		console.log(url);
		
		
		var res = await fetch(url);
		var json_content = await res.json();
		
		var json_data = json_content;
		console.log(json_data);
		var from_rate_str = `json_data.rates.USD${option_1}.rate`;
		var to_rate_str = `json_data.rates.USD${option_2}.rate`;	
		
		var from_rate = eval(`json_data.rates.USD${option_1}.rate`);
		var to_rate = eval(`json_data.rates.USD${option_2}.rate`);
		
		input2.value = input1.value / from_rate * to_rate;;
		
		var last_up_str = eval(`json_data.rates.USD${option_2}.timestamp`);
		console.log(eval(`json_data.rates.USD${option_2}.timestamp`));
		
		date = new Date(last_up_str * 1000);
		dates_1.innerHTML = `Last Updated : ${date.toString()} UTC`;
		
		
		
		
	}
}
	



function switch_values() {
	
	p_value_1 = document.querySelector(".select_p_1");
	p_value_2 = document.querySelector(".select_p_2");
	
	temp = p_value_1.innerHTML;
	p_value_1.innerHTML = p_value_2.innerHTML;
	p_value_2.innerHTML = temp;
	
	currency_converter();
}


 
async function test2() {
	url1 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDAED,USDGBP";
	url2 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDEUR,USDINR";
	url3 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDCAD,USDAUD";
	
	var row1_2 = document.querySelector(".row1_2");
	var row2_2 = document.querySelector(".row2_2");
	var row3_2 = document.querySelector(".row3_2");
	var row4_2 = document.querySelector(".row4_2");
	var row5_2 = document.querySelector(".row5_2");
	var row6_2 = document.querySelector(".row6_2");
	
	var i;
	 
		
//	for (i = 1; i<=3 ; i++){
//		const res = await fetch(`url${i}`);
//		res = await res.json();
//		console.log(res);
//		
//	}
	
	for (i = 1; i<=6 ; i++){
		row = document.querySelector(`.row${i}_2`);
		
		
		console.log(`row${i}_2---->${row.innerHTML}`)
		
		
	}
	
		
	}

function live_data (num) {
	url1 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDAED,USDGBP";
	url2 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDEUR,USDINR";
	url3 = "https://cors.bridged.cc/https://www.freeforexapi.com/api/live?pairs=USDCAD,USDAUD";

//	var row0_2 = document.querySelector(".row1_2");
//	var row1_2 = document.querySelector(".row2_2");
//	var row2_2 = document.querySelector(".row3_2");
//	var row3_2 = document.querySelector(".row4_2");
//	var row4_2 = document.querySelector(".row5_2");
//	var row5_2 = document.querySelector(".row6_2");
	
	
	
	
	
	var i;
	intid =  setInterval(async function(){ 
				
				var res1 = await fetch(url1);
				var res2 = await fetch(url2);
				var res3 = await fetch(url3);
				
				var json_data1 = await res1.json();
				var json_data2 = await res2.json();
				var json_data3 = await res3.json();
				
//				console.log(json_data);
				
				var usdaed = json_data1.rates.USDAED.rate;
				var usdgbp = json_data1.rates.USDGBP.rate;
				
				var usdeur = json_data2.rates.USDEUR.rate;
				var usdinr = json_data2.rates.USDINR.rate;
				
				var usdcad = json_data3.rates.USDCAD.rate;
				var usdaud = json_data3.rates.USDAUD.rate;
				
				curr_list = [usdaed,usdgbp,usdeur,usdinr,usdcad,usdaud];
				console.log(usdaed);
				console.log(usdgbp);
				console.log(usdeur);
				console.log(usdinr);
				console.log(usdcad);
				console.log(usdaud);
				
				for (i = 0; i<=5 ; i++){
					row2 = document.querySelector(`.row${i}_2`);
					row3 = document.querySelector(`.row${i}_3`);
					
					if (row2.innerHTML > curr_list[i] ){
						row3.innerHTML = `<span style="color:#b30021">▼</span>`;
					}
					
					else if (row2.innerHTML < curr_list[i]){
						row3.innerHTML = `<span style="color:#338800">▲</span>` ; 
					}
					
					row2.innerHTML = curr_list[i];
	
					console.log(`row${i}_2---->${row2.innerHTML}`);
					console.log(`row${i}_3---->${row3.innerHTML}`);

					
					
				}
						
//				row0_2.innerHTML = usdaed;
//				row1_2.innerHTML = usdgbp;
//				
//				row2_2.innerHTML = usdeur;
//				row3_2.innerHTML = usdinr;
//		
//				row4_2.innerHTML = usdcad;
//				row5_2.innerHTML = usdaud;
				
				
				
		
			}, num);
	
}

function live_set_values(){
	num_input  = document.getElementById("live-input-1");
	time_input = document.querySelector(".live1_select");
	
	refresh_col = document.querySelectorAll(".refresh_rate");
	var num;
	
	
	 if (num_input.value == 60 && time_input.innerHTML == "Minutes" || num_input.value == 1 && time_input.innerHTML == "Hours"){
		
		refresh_col.forEach( option => {
			option.innerHTML = "1 Hour" ;
		});
		num = 3600000;
		console.log(num);

		
	}
	else if (num_input.value == 60 && time_input.innerHTML == "Seconds" || num_input.value == 1 && time_input.innerHTML == "Minutes" ){
		
		refresh_col.forEach( option => {
			option.innerHTML = "1 Minute" ;
		});
		num = 60000;
		console.log(num);

		
	}
	
	else if (num_input.value >= 5 && num_input.value <= 59 && time_input.innerHTML == "Seconds"){
		
		refresh_col.forEach( option => {
			option.innerHTML = `${num_input.value} ${time_input.innerHTML}`;
		});
		
		num = num_input.value * 1000;
		console.log(num);

		
		
	}
	
	else if (num_input.value >= 1 && num_input.value <= 24 && time_input.innerHTML == "Hours"){
		
		refresh_col.forEach( option => {
			option.innerHTML = `${num_input.value} ${time_input.innerHTML}`;
		});
		
		num = num_input.value * 3600000;
		console.log(num);

		
	}
	else if (num_input.value >= 1 && num_input.value <= 59 && time_input.innerHTML == "Minutes"){
		
		refresh_col.forEach( option => {
			option.innerHTML = `${num_input.value} ${time_input.innerHTML}`;
		});
		num = num_input.value * 60000;
		console.log(num);

	}
	
	
	
	else {
		alert("Please check input");
	}
		
	return num;
	console.log(num_input.value);
	console.log(time_input.innerHTML);
	console.log(num);

	
	
	
}


async function plotChart() {
	
    var currency = document.querySelector(".data_select_p_2").innerHTML.slice(this.length - 3);
    var AEDUSD = JSON.parse(AEDdata);
    var chart_select = document.querySelector(".data_p").innerHTML;




    const [labels, trends] = await test();
	
	am4core.useTheme(am4themes_animated);
	
	let chart = am4core.create("chart", am4charts.XYChart);
	
	let xAxis = chart.xAxes.push(
		new am4charts.DateAxis()
				
	);
	xAxis.title.text = "Date";
//	xAxis.groupData = true;
//	xAxis.groupCount = 200;
//	xAxis.dateFormats.setKey("month", "MM");
//	xAxis.periodChangeDateFormats.setKey("month", "MM");
	
	
	let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
	yAxis.title.text = `1 USD in ${currency}`;
	
	
	series1 = eval(`chart.series.push(new am4charts.${chart_select}Series())`);
	series1.dataFields.valueY = "value";
	series1.dataFields.dateX = "date";
	series1.dataFields.value = "value";
	
	series1.tooltipText = `{value} ${currency}`;
	
	series1.tooltip.pointerOrientation = "vertical";
	
	if (currency == "AED"){
   
        var from_date_str = document.getElementById("date_input_1").value;
        var to_date_str =  document.getElementById("date_input_2").value;
        
        var from_date = new Date(from_date_str);
        var to_date = new Date(to_date_str);

        
        AEDUSD.reverse();
		chart.data = AEDUSD;
        chart.events.on("ready", () => {
            xAxis.zoomToDates(
                from_date,
                to_date
            );
        });
    
	}
	else{
        
		let data = [];
		let values = trends[currency];
		
		for (let i = 0; i < labels.length; i++) {
			data.push({
				date: labels[i],
				value: values[i]
			})
		}
		
		chart.data = data;
	}

	
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.snapToSeries = series1;
	chart.cursor.xAxis = xAxis;
	// chart.cursor.behavior = "zoomXY";
	
	
	// Add scrollbars
	chart.scrollbarX = new am4core.Scrollbar();
	chart.scrollbarY = new am4core.Scrollbar();
	xAxis.renderer.grid.template.stroke = "#0000D1";
	yAxis.renderer.grid.template.stroke = "#0000D1";
	xAxis.title.fontWeight = "bold";
	yAxis.title.fontWeight = "bold";
	series1.stroke = am4core.color("#ff0000");
	
}

am4core.ready(() => plotChart());

function currency_label() {
	p_value_2 = document.querySelector(".data_select_p_2");
	p_label = document.getElementById("data_label");
	
	p_label.innerHTML = `USD/${p_value_2.innerHTML.slice(this.length - 3)}`;
}


function unix_to_date(seconds) {
	
	var unix_time_stamp = seconds;
	var milliseconds = unix_time_stamp * 1000;
	
	var date_object = new Date(milliseconds);
	
	var human_date_format = date_object.toLocaleString("en-US", {timeZoneName: "short"});
	
	return human_date_format;
	
}







async function test() {
	 var from_date_str = document.getElementById("date_input_1").value;
	 var to_date_str =  document.getElementById("date_input_2").value;
		
	 var from_date = new Date(from_date_str);
	 var to_date = new Date(to_date_str);

	 var diff = Math.abs(to_date - from_date);
	 var diff_days = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
     
	 console.log(diff_days);
		 
	 var from_date_last = new Date("2018-06-01");
	
	 var today = new Date().toISOString().slice(0, 10);
	
	 var new_date = new Date();
	
	 
	
	if (from_date < from_date_last){
		alert("date exceeds 3 years");
	}
	
	else if (to_date > new_date) {
		alert("date exceeds Current date");
	}
	
	else{
		var url2 = `https://api.frankfurter.app/${from_date_str}..${to_date_str}?from=USD`;
		console.log(url2)
		var res = await fetch(url2);
		
		var json_data = await res.json();
		var labels = [];
		let trends = {};
		console.log(Object.keys(json_data.rates).length);
		
		
		
		for (var data in json_data.rates) {
			labels.push(data);
			
			for (var curr in json_data.rates[data]) {
				if (!trends[curr]) {
					trends[curr] = [];
				}
				trends[curr].push(json_data.rates[data][curr])
			}
			
		}
		return [labels, trends];
		
	}
	 
	
		
}

	

//
//end of functions
//




var selected_option_1 = document.querySelector(".element-1");
var selected_option_2 = document.querySelector(".element-2");

var options_1 = document.querySelectorAll(".options1");
var options_2 = document.querySelectorAll(".options2");


var select_image_1 = document.querySelector(".select-chevron-1");
var select_list_1 = document.querySelector(".ul-list-1");

var select_image_2 = document.querySelector(".select-chevron-2");
var select_list_2 = document.querySelector(".ul-list-2");



var data_option_1 = document.querySelector(".data-element-1");
var data_option_2 = document.querySelector(".data-element-2");

var data_options_1 = document.querySelectorAll(".data_options1");
var data_options_2 = document.querySelectorAll(".data_options2");

var data_image_1 = document.querySelector(".data-select-chevron-1");
var data_list_1 = document.querySelector(".data-ul-list-1");

var data_image_2 = document.querySelector(".data-select-chevron-2");
var data_list_2 = document.querySelector(".data-ul-list-2");



var live_element = document.querySelector(".live-element");
var live_options = document.querySelectorAll(".live-options");

var live_image = document.querySelector(".live-select-chevron");
var live_list = document.querySelector(".live-ul-list");

var live1_element = document.querySelector(".live1-element");
var live1_options = document.querySelectorAll(".live1-options");

var live1_image = document.querySelector(".live1-select-chevron");
var live1_list = document.querySelector(".live1-ul-list");

var refresh_bt = document.querySelector(".read_more3");
var Line_bt = document.querySelector(".line_bt");
var Bar_bt = document.querySelector(".bar_bt");
var data_p = document.querySelector(".data_p");

selected_option_1.addEventListener("click",()=>{
	select_list_1.classList.toggle("ul-list-1-active");
	select_image_1.classList.toggle("select-chevron-1-active");
	
});

options_1.forEach( option => {
	option.addEventListener("click", () => {
		document.querySelector(".select_p_1").innerHTML = option.innerHTML;
		select_list_1.classList.toggle("ul-list-1-active");
		select_image_1.classList.toggle("select-chevron-1-active");

	});
});



selected_option_2.addEventListener("click",()=>{
	select_list_2.classList.toggle("ul-list-2-active");
	select_image_2.classList.toggle("select-chevron-2-active");
	
});

options_2.forEach( option => {
	option.addEventListener("click", () => {
		document.querySelector(".select_p_2").innerHTML = option.innerHTML;
		select_list_2.classList.toggle("ul-list-2-active");
		select_image_2.classList.toggle("select-chevron-2-active");
		
	});
});











data_option_2.addEventListener("click",()=>{
	data_list_2.classList.toggle("data-ul-list-2-active");
	data_image_2.classList.toggle("data-select-chevron-2-active");
	
});

data_options_2.forEach( option => {
	option.addEventListener("click", () => {
		document.querySelector(".data_select_p_2").innerHTML = option.innerHTML;
		data_list_2.classList.toggle("data-ul-list-2-active");
		data_image_2.classList.toggle("data-select-chevron-2-active");
		currency_label();
		plotChart();
		
	});
});





live1_element.addEventListener("click",()=>{
	live1_list.classList.toggle("live1-ul-list-active");
	live1_image.classList.toggle("live1-select-chevron-active");
	
});

live1_options.forEach( option => {
	option.addEventListener("click", () => {
		document.querySelector(".live1_select").innerHTML = option.innerHTML;
		live1_list.classList.toggle("live1-ul-list-active");
		live1_image.classList.toggle("live1-select-chevron-active");
		
	});
});



refresh_bt.addEventListener("click", () =>{
	
	var num = live_set_values();
	live_set_values();
	clearInterval(intid);
	live_data(num);
});

Bar_bt.addEventListener("click", () =>{
	data_p.innerHTML = "Column";
    chart.dispose();
	plotChart();
});

Line_bt.addEventListener("click", () =>{
	data_p.innerHTML = Line_bt.innerHTML;
    chart.dispose();
	plotChart();
});
