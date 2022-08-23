import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import { useEffect } from "react";

export default function ChartMap () {

    useEffect(() => {
        const root = am5.Root.new("smartphone-chart");
        const root1 = am5.Root.new("feature-chart");

            let color = {
                    min: 0xf42a41,
                    max: 0xFFFF00,
                    legend: 0xf42a41
            },
            color1 = {
                    min: 0xf42a41,
                    max: 0x006a4e,
                    legend: 0x006a4e
            }
            let map_d = {
                "BD-H": {
                    id: "BD-H",
                    name: "Mymensingh",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-G": {
                    id: "BD-G",
                    name: "Sylhet",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-F": {
                    id: "BD-F",
                    name: "Rangpur",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-E": {
                    id: "BD-E",
                    name: "Rajshahi",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-D": {
                    id: "BD-D",
                    name: "Khulna",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-C": {
                    id: "BD-C",
                    name: "Dhaka",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-B": {
                    id: "BD-B",
                    name: "Chittagong",
                    value: Math.round(Math.random() * 10000),
                },
                "BD-A": {
                    id: "BD-A",
                    name: "Barisal",
                    value: Math.round(Math.random() * 10000),
                }
            };

            initMap(root, color, map_d);
            initMap(root1, color1, map_d);

            function initMap(root, color = {}, map_data = []) {
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);
                var chart = root.container.children.push(am5map.MapChart.new(root, {
                    panX: "none",
                    wheelY: "none",
                    hideCredits: true,
                    projection: am5map.geoMercator(),
                    layout: root.horizontalLayout,
                    maxZoomLevel: 1
                }));

                // chart.scrollbarX.startGrip.disabled = true;
                // chart.scrollbarX.endGrip.disabled = true;

                loadGeodata("BD");

                var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
                    calculateAggregates: true,
                    valueField: "value"
                }));

                polygonSeries.mapPolygons.template.setAll({
                    tooltipText: "{name} {value}",
                    interactive: true
                });

                polygonSeries.mapPolygons.template.states.create("hover", {
                    fill: am5.color(0x677935)
                });

                polygonSeries.set("heatRules", [{
                    target: polygonSeries.mapPolygons.template,
                    dataField: "value",
                    min: am5.color(color.min),
                    max: am5.color(color.max),
                    key: "fill"
                }]);

                polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
                    heatLegend.showValue(ev.target.dataItem.get("value"));
                });

                function loadGeodata(country) {
                    // Default map
                    var defaultMap = "usaLow";

                    if (country == "US") {
                        chart.set("projection", am5map.geoAlbersUsa());
                    } else {
                        chart.set("projection", am5map.geoMercator());
                    }

                    // calculate which map to be used
                    var currentMap = defaultMap;
                    var title = "";
                    if (am5geodata_data_countries2[country] !== undefined) {
                        currentMap = am5geodata_data_countries2[country]["maps"][0];

                        // add country title
                        if (am5geodata_data_countries2[country]["country"]) {
                            title = am5geodata_data_countries2[country]["country"];
                        }
                    }

                    am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + currentMap + ".json", chart).then(function(result) {
                        var geodata = am5.JSONParser.parse(result.response);
                        var msp_data = [];

                        for (var i = 0; i < geodata.features.length; i++) {
                            msp_data.push({
                                id: geodata.features[i].id,
                                value: map_data[geodata.features[i].id].value
                            });
                        }

                        polygonSeries.set("geoJSON", geodata);
                        polygonSeries.data.setAll(msp_data)
                    });

                    // chart.seriesContainer.children.push(am5.Label.new(root, {
                    //     x: 5,
                    //     y: 5,
                    //     text: title,
                    //     background: am5.RoundedRectangle.new(root, {
                    //         fill: am5.color(0xffffff),
                    //         fillOpacity: 2
                    //     })
                    // }))

                }

                var heatLegend = chart.children.push(
                    am5.HeatLegend.new(root, {
                        orientation: "vertical",
                        startColor: am5.color(color.min),
                        endColor: am5.color(color.max),
                        startText: "Lowest",
                        endText: "Highest",
                        stepCount: 5
                    })
                );

                heatLegend.startLabel.setAll({
                    fontSize: 12,
                    fill: am5.color(color.legend)
                });

                heatLegend.endLabel.setAll({
                    fontSize: 12,
                    fill: am5.color(color.legend)
                });

                // change this to template when possible
                polygonSeries.events.on("datavalidated", function() {
                    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
                    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
                });
            };
    }, []);
  return (
    <>
    <div className='col-md-6'>
      <div className='card card-flush h-md-100'>
        <div className='card-header pt-4'>
          <h2 className='cart-title'>Smartphone</h2>
        </div>
        {/*begin::Body*/}
        <div className='card-body p-0'>
          <div id='smartphone-chart' className='min-h-550px country-map' />
          <div className='row p-5 g-2 row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-2 row-cols-xl-auto row-cols-xxl-4'>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Dhaka: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Mymensingh: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Sylhet: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Rangpur: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Rajshahi: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Khulna: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Chittagong: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Barisal: <span className='text-danger'>320</span>
              </div>
            </div>
          </div>
        </div>
        {/*end::Body*/}
      </div>
    </div>
    <div className='col-md-6'>
      <div className='card card-flush h-md-100'>
        <div className='card-header pt-4'>
          <h2 className='cart-title'>Smartphone</h2>
        </div>
        {/*begin::Body*/}
        <div className='card-body p-0'>
          <div id='feature-chart' className='min-h-550px country-map' />
          <div className='row p-5 g-2 row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-2 row-cols-xl-auto row-cols-xxl-4'>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Dhaka: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Mymensingh: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Sylhet: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Rangpur: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Rajshahi: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Khulna: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Chittagong: <span className='text-danger'>320</span>
              </div>
            </div>
            <div className='col'>
              <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                Barisal: <span className='text-danger'>320</span>
              </div>
            </div>
          </div>
        </div>
        {/*end::Body*/}
      </div>
    </div>
    </>
  )
}
