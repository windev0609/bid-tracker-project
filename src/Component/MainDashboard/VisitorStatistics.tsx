import Chart from 'react-apexcharts';

const VisitorStatistics = () => {
  const options = {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    }
  };
  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 10]
    }
  ];
  return (
    <div className="row">
      <div className="mixed-chart">
        <Chart options={options} series={series} type="bar" width="100%" className="visit-chart" />
      </div>
    </div>
  );
};

export default VisitorStatistics;
