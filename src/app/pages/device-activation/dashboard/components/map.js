import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_data_countries2 from '@amcharts/amcharts5-geodata/data/countries2'
import {useEffect} from 'react'

export default function ChartMap ({data = {}, obj}) {
  useEffect(() => {

    let color = {
        min: 0xf42a41,
        max: 0xffff00,
        legend: 0xf42a41,
      },
      color1 = {
        min: 0xf42a41,
        max: 0x006a4e,
        legend: 0x006a4e,
      }
    let map_d = data?.featurePhone?.regions
    const map_d_smartphone = data?.smartPhone?.regions
    console.log('map d sp: ', map_d_smartphone)

    if(document.getElementById('smartphone-chart')) {
      const root = am5.Root.new('smartphone-chart')
      initMap(root, color, map_d_smartphone)
    }
    if(document.getElementById('feature-chart')) {
      const root1 = am5.Root.new('feature-chart')
      initMap(root1, color1, map_d)
    }

    function initMap (root, color = {}, map_data = []) {
      root.setThemes([am5themes_Animated.new(root)])
      var chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: 'none',
          wheelY: 'none',
          hideCredits: true,
          projection: am5map.geoMercator(),
          layout: root.horizontalLayout,
          maxZoomLevel: 1,
        })
      )

      // chart.scrollbarX.startGrip.disabled = true;
      // chart.scrollbarX.endGrip.disabled = true;

      loadGeodata('BD')

      var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          calculateAggregates: true,
          valueField: 'value',
        })
      )

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: '{name} {value}',
        interactive: true,
      })

      polygonSeries.mapPolygons.template.states.create('hover', {
        fill: am5.color(0x677935),
      })

      polygonSeries.set('heatRules', [
        {
          target: polygonSeries.mapPolygons.template,
          dataField: 'value',
          min: am5.color(color.min),
          max: am5.color(color.max),
          key: 'fill',
        },
      ])

      polygonSeries.mapPolygons.template.events.on('pointerover', function (ev) {
        heatLegend.showValue(ev.target.dataItem.get('value'))
      })

      function loadGeodata (country) {
        // Default map
        var defaultMap = 'usaLow'

        if (country == 'US') {
          chart.set('projection', am5map.geoAlbersUsa())
        } else {
          chart.set('projection', am5map.geoMercator())
        }

        // calculate which map to be used
        var currentMap = defaultMap
        var title = ''
        if (am5geodata_data_countries2[country] !== undefined) {
          currentMap = am5geodata_data_countries2[country]['maps'][0]

          // add country title
          if (am5geodata_data_countries2[country]['country']) {
            title = am5geodata_data_countries2[country]['country']
          }
        }

        am5.net
          .load('https://cdn.amcharts.com/lib/5/geodata/json/' + currentMap + '.json', chart)
          .then(function (result) {
            var geodata = am5.JSONParser.parse(result.response)
            console.log('geo data: ', geodata)
            var msp_data = []

            for (var i = 0; i < geodata.features.length; i++) {
              msp_data.push({
                id: geodata.features[i].id,
                value: map_data[geodata.features[i].id].value,
              })
            }

            polygonSeries.set('geoJSON', geodata)
            polygonSeries.data.setAll(msp_data)
          })

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
          orientation: 'vertical',
          startColor: am5.color(color.min),
          endColor: am5.color(color.max),
          startText: 'Lowest',
          endText: 'Highest',
          stepCount: 5,
        })
      )

      heatLegend.startLabel.setAll({
        fontSize: 12,
        fill: am5.color(color.legend),
      })

      heatLegend.endLabel.setAll({
        fontSize: 12,
        fill: am5.color(color.legend),
      })

      // change this to template when possible
      polygonSeries.events.on('datavalidated', function () {
        heatLegend.set('startValue', polygonSeries.getPrivate('valueLow'))
        heatLegend.set('endValue', polygonSeries.getPrivate('valueHigh'))
      })
    }
  }, [])


  return (
    <>
      {obj?.deviceType != 1 && (
        <div className={`col-md-${obj?.deviceType ? 12 : 6}`}>
        <div className='card card-flush h-md-100'>
          <div className='card-header pt-4'>
            <h2 className='cart-title'>Feature Phone</h2>
          </div>
          {/*begin::Body*/}
          <div className='card-body p-0'>
            <div id='feature-chart' className='min-h-550px country-map' />
            <div className='row p-5 g-2 row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-2 row-cols-xl-auto row-cols-xxl-4'>
              {Object.keys(data?.featurePhone?.regions).map((key, indx) => (
                <div className='col' key={indx}>
                  <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                    {data?.featurePhone?.regions[key]?.name}:{' '}
                    <span className='text-danger'>{data?.featurePhone?.regions[key]?.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*end::Body*/}
        </div>
      </div>
      )}
      {obj?.deviceType != 2 && (
        <div className={`col-md-${obj?.deviceType ? 12 : 6}`}>
        <div className='card card-flush h-md-100'>
          <div className='card-header pt-4'>
            <h2 className='cart-title'>Smart Phone</h2>
          </div>
          {/*begin::Body*/}
          <div className='card-body p-0'>
            <div id='smartphone-chart' className='min-h-550px country-map' />
            <div className='row p-5 g-2 row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-2 row-cols-xl-auto row-cols-xxl-4'>
              {Object.keys(data?.smartPhone?.regions).map((key, indx) => (
                <div className='col' key={indx}>
                  <div className='fs-5 d-flex justify-content-between badge badge-light-primary'>
                    {data?.smartPhone?.regions[key]?.name}:{' '}
                    <span className='text-danger'>{data?.smartPhone?.regions[key]?.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*end::Body*/}
        </div>
      </div>
      )}
    </>
  )
}
