$(function () {

    var graph_series = []

    function fetch_light_intensity_data(callback){
        $.ajax({
            url: "http://127.0.0.1:5000/fetch_data",
            type: "GET",
            processData: false,
            contentType: false,
            success: function (result, event) {
                if (result["error"] == "0") {
                    callback(result['data'])
                } else {
                    callback([])
                }
            },
            error: function (result, event) {
                callback([])
            },
        });
    }

    function set_data_refresh(){
        setInterval(function () {
            fetch_light_intensity_data(function(data){
                if(data.length > 0){
                    data.forEach(element => {
                        graph_series[0].addPoint(new Date(element['time_stamp']).getTime(), element['soil_temp'])
                        graph_series[1].addPoint(new Date(element['time_stamp']).getTime(), element['light_intensity'])
                        graph_series[2].addPoint(new Date(element['time_stamp']).getTime(), element['air_temperature'])
                        graph_series[3].addPoint(new Date(element['time_stamp']).getTime(), element['soil_moisture_1'])
                        graph_series[4].addPoint(new Date(element['time_stamp']).getTime(), element['soil_moisture_2'])
                        graph_series[5].addPoint(new Date(element['time_stamp']).getTime(), element['soil_moisture_3'])
                    });
                }
            })
        }, 10000);
    }

    Highcharts.chart('soilTempGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Soil Temperature'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Temperature ( ˚C )'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    Highcharts.chart('airTempGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Air Temperature'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Temperature ( ˚C )'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    Highcharts.chart('lightGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Light'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Lumen ( lm )'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    Highcharts.chart('soilMoistureGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Soil Moisture 1'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'meter cube'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    Highcharts.chart('soilMoisture2Graph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Soil Moisture 2'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'meter cube'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    Highcharts.chart('soilMoisture3Graph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    graph_series.push(this.series[0])
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Soil Moisture 3'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'meter cube'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],time = (new Date()).getTime(),i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data)
                return data;
            }())
        }]
    });

    set_data_refresh()

});