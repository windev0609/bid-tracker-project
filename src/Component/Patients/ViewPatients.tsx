import { useLocation } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Tabs } from 'antd';
import './ViewPatients.scss';
import HospitalActivity from '../MainDashboard/HospitalActivity';
import { Setup } from '../../TypeFile/TypeScriptType';
import { Demo } from 'manimaran001';

const ViewPatients = () => {
  const { TabPane } = Tabs;

  const onChange = (key: string) => {
    console.log(key);
  };

  const activity = 'patientActivities';
  const PatientActivity: Setup[] = [
    {
      id: '21321321',
      username: 'jahnwi',
      TimeLine: [
        {
          date: '01 Aug 2024',
          reportHeading: 'Blood Report',
          bloodReport: true,
          admitReport: false,
          checkupReport: false,
          surgeryReport: false,
          images: [],
          description: 'wbc count is less than 12 ',
          reportTable: [
            {
              tableHeader: 'analysis',
              data: [
                { name: 'wbc', amount: '3223' },
                { name: 'rbc', amount: '3223' },
                { name: 'pressure', amount: '3223' },
                { name: 'temprature', amount: '3223' }
              ]
            },
            {
              tableHeader: 'species',
              data: [
                { name: 'wbc', amount: '3223' },
                { name: 'rbc', amount: '3223' },
                { name: 'pressure', amount: '3223' },
                { name: 'temprature', amount: '3223' }
              ]
            }
          ]
        },
        {
          date: '01 Jun 2020',
          reportHeading: 'Blood checkup test',
          bloodReport: false,
          admitReport: false,
          checkupReport: true,
          surgeryReport: false,
          description: 'increaed wbc cells numerology attack count inreases',
          reportTable: [],
          images: []
        },
        {
          date: '01 Jun 2018',
          reportHeading: 'Spinal Osteomyelitis Surgery',
          bloodReport: false,
          admitReport: false,
          checkupReport: false,
          surgeryReport: true,
          images: [
            'https://media.istockphoto.com/photos/offering-patientcentred-care-that-proves-effective-and-efficient-picture-id1301555107?k=20&m=1301555107&s=612x612&w=0&h=Cnj-PabtvN4J6xBVonpez02ub100LmbKDlNPLjy_w9Y=',
            'https://media.istockphoto.com/photos/diagnostic-tools-get-a-digital-upgrade-picture-id1300505874?k=20&m=1300505874&s=612x612&w=0&h=Ev_S8Ag5Pf8LiHL-dW-N8PxgftQ4D8KK-5snYu-Bhn0='
          ],
          description: 'surgery handles attack affection svere tumor issues',
          reportTable: []
        }
      ]
    }
  ];
  const location: any = useLocation();
  return (
    <div className="p-3">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <div>
            <Demo
              patientName={location?.state?.patientName}
              patientImage={location?.state?.patientImage}
              email={location?.state?.email}
              address={location?.state?.address}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
          <Paper>
            <div className="p-3">
              <div className="">
                <Tabs defaultActiveKey="1" onChange={onChange}>
                  <TabPane tab="Activity" key="1">
                    <HospitalActivity activities={activity} reportsData={PatientActivity} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ViewPatients;
