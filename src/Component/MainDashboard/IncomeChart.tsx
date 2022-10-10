import React from 'react';
import './IncomeChart.scss';
import CanvasJSReact from '../../Lib/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const IncomeChart = () => {
  const options = {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: ''
    },
    subtitles: [
      {
        text: ''
      }
    ],
    axisX: {
      title: ''
    },
    axisY: {
      title: '',
      titleFontColor: '#6D78AD',
      lineColor: '#6D78AD',
      labelFontColor: '#6D78AD',
      tickColor: '#6D78AD'
    },
    axisY2: {
      title: '',
      titleFontColor: '#51CDA0',
      lineColor: '#6D78AD',
      labelFontColor: '#51CDA0',
      tickColor: '#51CDA0'
    },
    toolTip: {
      shared: true
    },
    // legend: {
    //     cursor: "pointer",
    //     itemclick: (e:any)=>toggleDataSeries(e)
    // },
    data: [
      {
        type: 'spline',
        name: '',
        dataPoints: [
          { y: 155, label: 'Jan' },
          { y: 150, label: 'Feb' },
          { y: 152, label: 'Mar' },
          { y: 148, label: 'Apr' },
          { y: 142, label: 'May' },
          { y: 150, label: 'Jun' },
          { y: 146, label: 'Jul' },
          { y: 149, label: 'Aug' },
          { y: 153, label: 'Sept' },
          { y: 158, label: 'Oct' },
          { y: 154, label: 'Nov' },
          { y: 150, label: 'Dec' }
        ]
      },
      {
        type: 'spline',
        name: '',
        dataPoints: [
          { y: 125, label: 'Jan' },
          { y: 150, label: 'Feb' },
          { y: 112, label: 'Mar' },
          { y: 148, label: 'Apr' },
          { y: 182, label: 'May' },
          { y: 150, label: 'Jun' },
          { y: 126, label: 'Jul' },
          { y: 169, label: 'Aug' },
          { y: 183, label: 'Sept' },
          { y: 158, label: 'Oct' },
          { y: 134, label: 'Nov' },
          { y: 150, label: 'Dec' }
        ]
      },
      {
        type: 'spline',
        name: '',
        dataPoints: [
          { y: 115, label: 'Jan' },
          { y: 170, label: 'Feb' },
          { y: 192, label: 'Mar' },
          { y: 108, label: 'Apr' },
          { y: 182, label: 'May' },
          { y: 130, label: 'Jun' },
          { y: 126, label: 'Jul' },
          { y: 169, label: 'Aug' },
          { y: 183, label: 'Sept' },
          { y: 118, label: 'Oct' },
          { y: 134, label: 'Nov' },
          { y: 150, label: 'Dec' }
        ]
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default IncomeChart;
