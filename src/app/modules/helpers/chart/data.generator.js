

export const prepareHourlyData = (data) => {
    
    const state = {
        series: [{
                name: "Daily Pack",
                data: []
            },{
                name: "Weekly Pack",
                data: []
            },{
                name: 'Monthly Pack',
                data: []
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            title: {
                text: 'Page Statistics',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter: function (val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: [],
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " (mins)"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " per session"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        },


    };
    
    const data_daily = {};
    const data_weekly = {};
    const data_monthly = {};

    data.forEach(item => {
        const hour = new Date(item?.last_charged_at)?.getHours();
        
        if(item?.name === "Daily Pack") {
            data_daily[hour] = (data_daily[hour] || 0) + 1;
            data_weekly[hour] = (data_weekly[hour] || 0);
            data_monthly[hour] = (data_monthly[hour] || 0);
        } else if(item?.name === "Weekly Pack") {
            data_weekly[hour] = (data_weekly[hour] || 0) + 1;
            data_daily[hour] = (data_daily[hour] || 0);
            data_monthly[hour] = (data_monthly[hour] || 0);
        } else if(item?.name === "Monthly Pack") {
            data_monthly[hour] = (data_monthly[hour] || 0) + 1;
            data_daily[hour] = (data_daily[hour] || 0);
            data_weekly[hour] = (data_weekly[hour] || 0);
        }
        
    });

    return {
        ...state,
        series: [{
            name: "Daily Pack",
            data: Object.values(data_daily)
        }, {
            name: "Weekly Pack",
            data: Object.values(data_weekly)
        }, {
            name: 'Monthly Pack',
            data: Object.values(data_monthly)
        }],
        options: {
            ...state.options, 
            xaxis: {
                ...state.options.xaxis,
                categories: Object.keys(data_daily)
            }
        }
    };
};