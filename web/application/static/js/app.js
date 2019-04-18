$(function () {

    Highcharts.chart('soilTempGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        series.addPoint([x, y], true, true);
                    }, 1000);
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
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
    });

    Highcharts.chart('airTempGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
        },
        title: {
            text: 'Air Temperature'
        },
        yAxis: {
            title: {
                text: 'Temperature (°F)'
            }
        },
        series: [{
            data: [
                3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                10.1
            ]

        }],
    });

    Highcharts.chart('lightGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
        },
        title: {
            text: 'Light'
        },
        yAxis: {
            title: {
                text: 'Luminous (lm)'
            }
        },
        series: [{
            data: [
                3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                10.1
            ]

        }],
    });

    Highcharts.chart('soilMoistureGraph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
        },
        title: {
            text: 'Soil Moisture 1'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            data: [
                3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                10.1
            ]

        }],
    });

    Highcharts.chart('soilMoisture2Graph', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
        },
        title: {
            text: 'Soil Moisture 2'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            data: [
                3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                10.1
            ]

        }],
    });

});