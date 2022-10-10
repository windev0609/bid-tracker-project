/* eslint-disable react/prop-types */
/*
CanvasJS React Charts - https://canvasjs.com/
Copyright 2022 fenopix

--------------------- License Information --------------------
CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
https://canvasjs.com/license/

*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
let React = require('react');
// eslint-disable-next-line @typescript-eslint/no-var-requires
let CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSChart extends React.Component {
  static _cjsContainerId = 0;
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    this.options = props.options ? props.options : {};
    this.containerProps = props.containerProps
      ? { ...props.containerProps }
      : { width: '100%', position: 'relative' };
    this.containerProps.height =
      props.containerProps && props.containerProps.height
        ? props.containerProps.height
        : this.options.height
        ? this.options.height + 'px'
        : '400px';
    this.chartContainerId = 'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++;
  }
  componentDidMount() {
    //Create Chart and Render
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
    this.chart.render();

    if (this.props.onRef) this.props.onRef(this.chart);
  }
  shouldComponentUpdate(nextProps) {
    //Check if Chart-options has changed and determine if component has to be updated
    return !(nextProps.options === this.options);
  }
  componentDidUpdate() {
    //Update Chart Options & Render
    this.chart.options = this.props.options;
    this.chart.render();
  }
  componentWillUnmount() {
    //Destroy chart and remove reference
    if (this.chart) this.chart.destroy();

    if (this.props.onRef) this.props.onRef(undefined);
  }
  render() {
    return <div id={this.chartContainerId} style={this.containerProps} />;
  }
}

let CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS
};

export default CanvasJSReact;
