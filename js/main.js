//
//functions
//


//currency conversion function 
async function currency_converter() {
    var input1 = document.getElementById("input-1");
    var input2 = document.getElementById("input-2");
    var dates_1 = document.getElementById("dates_1");
    var dates_2 = document.getElementById("dates_2");
    
    var option_1 = document.querySelector(".select_p_1").innerHTML.slice(this.length - 3);
    console.log(option_1);
    var option_2 = document.querySelector(".select_p_2").innerHTML.slice(this.length - 3);
    
    
    if (option_1 == option_2){
        input2.value = input1.value;
    }
    
    else{
        
        const usd2aed = 3.6728;
        
        if (option_1 === 'AED') {
            
            if (option_2 === 'USD') {
                var rate = 1;
            }
            else {
                var url = `https://api.frankfurter.app/latest?from=USD&to=${option_2}`;
                
                var res = await fetch(url);
                var json_data = await res.json();
                
                var rate = option_2 === 'USD' ? 1 : json_data.rates[option_2];
            }
            
            let usd = input1.value / usd2aed
            input2.value = usd * rate;
        }
        
        else if (option_2 === 'AED') {
            
            if (option_1 === 'USD') {
                var rate = 1;
            }
            else {
                var url = `https://api.frankfurter.app/latest?from=${option_1}&to=USD`;
                
                
                var res = await fetch(url);
                var json_data = await res.json();
                
                var rate =  json_data.rates.USD;
            }
            
            
            let aed = input1.value * usd2aed
            input2.value = aed * rate;
        }
        
        else {
            var url = `https://api.frankfurter.app/latest?from=${option_1}&to=${option_2}`;
            console.log(url);
            
            var res = await fetch(url);
            var json_data = await res.json();
            
            var rate = json_data.rates[option_2];
            input2.value = input1.value * rate;
        }
        
        input2.value = (+input2.value).toFixed(2);
        
    }
}



// switches values of the currency converter and runs conversion function again
function switch_values() {

    p_value_1 = document.querySelector(".select_p_1");
    p_value_2 = document.querySelector(".select_p_2");

    temp = p_value_1.innerHTML;
    p_value_1.innerHTML = p_value_2.innerHTML;
    p_value_2.innerHTML = temp;

    currency_converter();
}




//gets live rates from api 
async function getRate(code) {
    const url = `https://v6.exchangerate-api.com/v6/8f628fd725e25356657d5818/pair/${code}`;
    
    const res = await fetch(url);
    const data = await res.json();
    return data.conversion_rate;
}



//puts live rates on the table 
function live_data (num) {
    url1 = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP";
    url2 = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP";
    url3 = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/USD/GBP";
    
    
    
    async function callback() { 
        
        var i;
        for (i = 0; i<=5 ; i++){
            row1 = document.querySelector(`.row${i}_1`).innerHTML.trim();
            row2 = document.querySelector(`.row${i}_2`);
            row3 = document.querySelector(`.row${i}_3`);
            
            
            const rate = await getRate(row1);
            
            
            if (row2.innerHTML > rate ){
                row3.innerHTML = `<span style="color:#b30021">▼</span>`;
            }
            
            else if (row2.innerHTML < rate){
                row3.innerHTML = `<span style="color:#338800">▲</span>` ; 
            }
            
            row2.innerHTML = rate;
            
                        
        }
        
    }
    
    
    callback()
    intid =  setInterval(callback, num);
    
}


//sets the refresh rate for the live data
function live_set_values() {
    num_input = document.getElementById("live-input-1");
    time_input = document.querySelector(".live1_select");

    refresh_col = document.querySelectorAll(".refresh_rate");
    var num;

     if ( num_input.value == 1) {
        
        refresh_col.forEach(option => {
            option.innerHTML = `1 Hour`;
        });
        
        num = 3600000;
       
        
    }
    
    
     else if (num_input.value >= 1 && num_input.value <= 24 && time_input.innerHTML == "Hours") {
        
        refresh_col.forEach(option => {
            option.innerHTML = `${num_input.value} ${time_input.innerHTML}`;
        });

        num = num_input.value * 3600000;
        


    } 
    
    else {
        alert("Please check input");
    }

    return num;
    console.log(num_input.value);
    console.log(time_input.innerHTML);
    console.log(num);




}



// plots chart
async function plotChart() {

    var currency = document.querySelector(".data_select_p_2").innerHTML.slice(this.length - 3);
    var AEDUSD = JSON.parse(AEDdata);
    var chart_select = document.querySelector(".data_p").innerHTML;




    const [labels, trends] = await hist_data();

    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chart", am4charts.XYChart);

    let xAxis = chart.xAxes.push(
        new am4charts.DateAxis()

    );
    xAxis.title.text = "Date";



    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = `1 USD in ${currency}`;


    series1 = eval(`chart.series.push(new am4charts.${chart_select}Series())`);
    series1.dataFields.valueY = "value";
    series1.dataFields.dateX = "date";
    series1.dataFields.value = "value";

    series1.tooltipText = `{value} ${currency}`;

    series1.tooltip.pointerOrientation = "vertical";

    if (currency == "AED") {

        var from_date_str = document.getElementById("date_input_1").value;
        var to_date_str = document.getElementById("date_input_2").value;

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

    } else {

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


    // Add scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    xAxis.renderer.grid.template.stroke = "#0000D1";
    yAxis.renderer.grid.template.stroke = "#0000D1";
    xAxis.title.fontWeight = "bold";
    yAxis.title.fontWeight = "bold";

    if (document.querySelector(".data_p").innerHTML == "Line") {
        series1.stroke = am4core.color("#ff0000");
    }



}

am4core.ready(() => plotChart());




//sets currency label in the historical data page
function currency_label() {
    p_value_2 = document.querySelector(".data_select_p_2");
    p_label = document.getElementById("data_label");

    p_label.innerHTML = `USD/${p_value_2.innerHTML.slice(this.length - 3)}`;
}



//gets historical data 
async function hist_data() {
    var from_date_str = document.getElementById("date_input_1").value;
    var to_date_str = document.getElementById("date_input_2").value;

    var from_date = new Date(from_date_str);
    var to_date = new Date(to_date_str);

    var diff = Math.abs(to_date - from_date);
    var diff_days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    console.log(diff_days);

    var from_date_last = new Date("2018-06-01");

    var today = new Date().toISOString().slice(0, 10);

    var new_date = new Date();



    if (from_date < from_date_last) {
        alert("date out of 3 Year Range");
    } else if (to_date > new_date) {
        alert("date out of 3 Year Range");
    } else {
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





//
//variables declared for event listeners
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

//
//variables declared for event listeners
//



//
//event listeners
//

selected_option_1.addEventListener("click", () => {
    select_list_1.classList.toggle("ul-list-1-active");
    select_image_1.classList.toggle("select-chevron-1-active");

});

options_1.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".select_p_1").innerHTML = option.innerHTML;
        select_list_1.classList.toggle("ul-list-1-active");
        select_image_1.classList.toggle("select-chevron-1-active");

    });
});



selected_option_2.addEventListener("click", () => {
    select_list_2.classList.toggle("ul-list-2-active");
    select_image_2.classList.toggle("select-chevron-2-active");

});

options_2.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".select_p_2").innerHTML = option.innerHTML;
        select_list_2.classList.toggle("ul-list-2-active");
        select_image_2.classList.toggle("select-chevron-2-active");

    });
});




data_option_2.addEventListener("click", () => {
    data_list_2.classList.toggle("data-ul-list-2-active");
    data_image_2.classList.toggle("data-select-chevron-2-active");

});

data_options_2.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".data_select_p_2").innerHTML = option.innerHTML;
        data_list_2.classList.toggle("data-ul-list-2-active");
        data_image_2.classList.toggle("data-select-chevron-2-active");
        currency_label();
        plotChart();

    });
});




live1_element.addEventListener("click", () => {
    live1_list.classList.toggle("live1-ul-list-active");
    live1_image.classList.toggle("live1-select-chevron-active");

});

live1_options.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".live1_select").innerHTML = option.innerHTML;
        live1_list.classList.toggle("live1-ul-list-active");
        live1_image.classList.toggle("live1-select-chevron-active");

    });
});



refresh_bt.addEventListener("click", () => {

    var num = live_set_values();
    live_set_values();
    clearInterval(intid);
    live_data(num);
});

Bar_bt.addEventListener("click", () => {
    data_p.innerHTML = "Column";
    am4core.disposeAllCharts();
    plotChart();
});

Line_bt.addEventListener("click", () => {
    data_p.innerHTML = Line_bt.innerHTML;
    am4core.disposeAllCharts();
    plotChart();
});


//
//event listeners
//