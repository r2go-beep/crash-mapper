import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function BarGraph({title, data, xAxisTitle, yAxisTitle, interval}) {
    const options = {
        title: {
          text: title,
          padding: 5,
          fontWeight: "normal",
        },
        data: [{				
                  type: "column",
                  dataPoints: data
        }],
        axisX:{
          margin:10,
          labelAngle: 0,
          fontSize: 16,
          title : xAxisTitle,
          interval: interval,
        },
        
        axisY:{
          margin:15,
          title : yAxisTitle,
          minimum: 0,
        },
        scale: {
          ticks: {
            precision: 0
          }
        }
     }

     return(
        <CanvasJSChart options = {options}
            containerProps={{width: '90%', flex:1, justifyContent: "center", margin: "10px"}} />
     )
}
