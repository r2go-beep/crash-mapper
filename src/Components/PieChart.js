import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function PieChart({title, data}) {
  const options = {
      title: {
        text: title,
        padding: 5
      },
      data: [{				
        type: "pie",
        indexLabel: `{label} {y}`,
        dataPoints: data
      }],
      axisX:{
        margin:10,
        labelAngle: 0
      },
      axisY:{
        margin:15
      }
    }

    return(
      <CanvasJSChart options = {options}
          containerProps={{width: '90%', flex:0.7,  justifyContent: "center", margin: "20px"}} />
    )
}
