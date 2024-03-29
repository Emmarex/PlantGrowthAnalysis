$(function () {

    var graph_series = []

    var soil_temp_graph_option = {
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
        title: {
            text: 'Soil Temperature'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'Temperature ( ˚C )'
            }
        },
        series: [{
            name: 'Soil Temperature'
        }]
    }

    var air_temp_graph_option = {
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
        title: {
            text: 'Air Temperature'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'Temperature ( ˚C )'
            }
        },
        series: [{
            name: 'Air Temperature'
        }]
    }

    var light_graph_option = {
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
        title: {
            text: 'Light Intensity'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'Lumen ( lm )'
            }
        },
        series: [{
            name: 'Light Intensity'
        }]
    }

    var soil_mois_1_graph_option = {
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
        title: {
            text: 'Soil Moisture 1'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'meter cube'
            }
        },
        series: [{
            name: 'Soil Moisture 1'
        }]
    }

    var soil_mois_2_graph_option = {
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
        title: {
            text: 'Soil Moisture 2'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'meter cube'
            }
        },
        series: [{
            name: 'Soil Moisture 2'
        }]
    }

    var soil_mois_3_graph_option = {
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
        title: {
            text: 'Soil Moisture 3'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: 'meter cube'
            }
        },
        series: [{
            name: 'Soil Moisture 3'
        }]
    }

    function set_data_refresh() {
        setInterval(function () {
            start_location = window.localStorage.getItem('limit')
            limit = parseInt(start_location) + 10
            $.ajax({
                url: "http://127.0.0.1:5000/fetch_pi_data?start="+start_location+"&stop="+limit,
                type: "GET",
                processData: false,
                contentType: false,
                success: function (result, event) {
                    if (result["error"] == "0") {
                        var data = result['data']
                        console.log(data)
                        if (data.length > 0) {
                            data.forEach(element => {
                                if(element['soil_temp'] != "" && element['soil_temp'] != null){
                                    graph_series[0].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['soil_temp']
                                    ], true, graph_series[0].data.length > 30)
                                }
                                if(element['air_temp'] != "" && element['air_temp'] != null){
                                    graph_series[1].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['air_temp']
                                    ], true, graph_series[1].data.length > 30)
                                }
                            });
                        }
                    }
                },
                error: function (result, event) {},
            });
            $.ajax({
                url: "http://127.0.0.1:5000/fetch_arduino_data?start="+start_location+"&stop="+limit,
                type: "GET",
                processData: false,
                contentType: false,
                success: function (result, event) {
                    if (result["error"] == "0") {
                        var data = result['data']
                        if (data.length > 0) {
                            data.forEach(element => {
                                if(element['light_intensity'] != "" && element['light_intensity'] != null){
                                    graph_series[2].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['light_intensity']
                                    ], true, graph_series[1].data.length > 30)
                                }
                                if(element['soil_moisture_1'] != "" && element['soil_moisture_1'] != null){
                                    graph_series[3].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['soil_moisture_1']
                                    ], true, graph_series[3].data.length > 30)
                                }
                                if(element['soil_moisture_2'] != "" && element['soil_moisture_2'] != null){
                                    graph_series[4].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['soil_moisture_2']
                                    ], true, graph_series[4].data.length > 30)
                                }
                                if(element['soil_moisture_3'] != "" && element['soil_moisture_3'] != null){
                                    graph_series[5].addPoint([
                                        new Date(element['time_stamp']).getTime(), element['soil_moisture_3']
                                    ], true, graph_series[5].data.length > 30)
                                }
                            });
                        }
                        window.localStorage.setItem('limit',limit)
                    }
                },
                error: function (result, event) {},
            });
        }, 30000);
    }

    $(document).ready(function () {

        Highcharts.setOptions({
            global: {
              useUTC: false
            }
        });

        $.ajax({
            url: "http://127.0.0.1:5000/fetch_pi_data?start=0&stop=10",
            type: "GET",
            processData: false,
            contentType: false,
            success: function (result, event) {
                if (result["error"] == "0") {
                    preprocess_pi_data(result['data'])
                    $.ajax({
                        url: "http://127.0.0.1:5000/fetch_arduino_data?start=0&stop=10",
                        type: "GET",
                        processData: false,
                        contentType: false,
                        success: function (result, event) {
                            if (result["error"] == "0") {
                                preprocess_arduino_data(result['data'])
                            }
                        },
                        error: function (result, event) {},
                    });
                }
            },
            error: function (result, event) {},
        });

        function preprocess_pi_data(data) {
            soil_temp_data = [], air_temp_data = []
            data.forEach(element => {
                soil_temp_data.push([
                    new Date(element['time_stamp']).getTime(), element['soil_temp']
                ])
                air_temp_data.push([
                    new Date(element['time_stamp']).getTime(), element['air_temp']
                ])
            });
            // soil temperature
            soil_temp_graph_option.series[0].data = soil_temp_data
            Highcharts.chart('soilTempGraph', soil_temp_graph_option)
            // air temperature
            air_temp_graph_option.series[0].data = air_temp_data
            Highcharts.chart('airTempGraph', air_temp_graph_option)
        }

        function preprocess_arduino_data(data) {
            light_data = [], soil_moisture = [], soil_moisture02 = [], soil_moisture03 = []
            data.forEach(element => {
                light_data.push([
                    new Date(element['time_stamp']).getTime(), element['light_intensity']
                ])
                soil_moisture.push([
                    new Date(element['time_stamp']).getTime(), element['soil_moisture_1']
                ])
                soil_moisture02.push([
                    new Date(element['time_stamp']).getTime(), element['soil_moisture_2']
                ])
                soil_moisture03.push([
                    new Date(element['time_stamp']).getTime(), element['soil_moisture_3']
                ])
            });
            // light intensity
            light_graph_option.series[0].data = light_data
            Highcharts.chart('lightGraph', light_graph_option)
            // Soil Moisture 1
            soil_mois_1_graph_option.series[0].data = soil_moisture
            Highcharts.chart('soilMoistureGraph', soil_mois_1_graph_option)
            // Soil Moisture 2
            soil_mois_2_graph_option.series[0].data = soil_moisture02
            Highcharts.chart('soilMoisture2Graph', soil_mois_2_graph_option)
            // Soil Moisture 3
            soil_mois_3_graph_option.series[0].data = soil_moisture03
            Highcharts.chart('soilMoisture3Graph', soil_mois_3_graph_option)
            //
            window.localStorage.setItem('limit',10)
            // activate data refresh
            set_data_refresh()
        }

    });


});