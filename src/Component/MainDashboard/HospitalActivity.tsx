import * as React from 'react';
import './HospitalActivity.scss';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { Card, CardMedia, Divider } from '@mui/material';
import { NumericValue, Setup, TableSetup, TimelineSetup } from '../../TypeFile/TypeScriptType';
const HospitalActivity: React.FC<{ activities: string; reportsData: Setup[] }> = (props) => {
  return (
    <div>
      {props.activities === 'HospitalActivity' ? (
        <>
          <section className="">
            <ul className="timeline">
              <li className="timeline-item mb-5  d-flex align-items-start flex-column">
                <p className="text-date">20-04-2018 - Today</p>
                <h5 className="mb-2 fw-bold">A Brief History Of Anesthetics</h5>
                <p className="text-name">
                  <span>Dharmaraj</span> San Francisco, CA
                </p>
                <p className="text-comment">
                  I&apos;m speaking with myself, number one, because I have a very good brain and
                  I&apos;ve said a lot of things.
                </p>
                <div className="d-flex gap-3">
                  <div className="text-comment-icons">
                    <AiOutlineLike className="text-comment-icons" /> like
                  </div>
                  <div className="text-comment-icons">
                    <FaRegComment className="text-comment-icons" /> comment
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <section className="">
            <ul className="timeline">
              {props.reportsData.length > 0 &&
                props.reportsData.map((val: Setup) => {
                  return val.TimeLine.map((item: TimelineSetup) => {
                    return (
                      <>
                        <li className="timeline-item mb-5  d-flex align-items-start flex-column">
                          <p className="text-date">{item.date}</p>
                          <h5 className="mb-2 fw-bold">{item.reportHeading}</h5>
                          {/* <p className="text-name">
                                                            <span>Elisse Joson</span> San Francisco, CA
                                                        </p>
                                                        <p className="text-name">
                                                            <span>Elisse Joson</span>
                                                        </p> */}
                          <p className="text-comment">{item.description}</p>

                          <div className="w-100">
                            <div className="d-flex gap-5">
                              {item.images.length > 0 &&
                                item?.images?.map((valText: string, indexes: number) => {
                                  return (
                                    <Card sx={{ width: 300 }} key={indexes}>
                                      <CardMedia
                                        component="img"
                                        height="140"
                                        image={valText}
                                        alt="green iguana"
                                      />
                                    </Card>
                                  );
                                })}
                            </div>
                            {item?.reportTable.length > 0 && (
                              <div className="report--table w-100 d-flex gap-3 mt-4">
                                {item?.reportTable?.map((itm: TableSetup, index: number) => {
                                  return (
                                    <div className="reports" key={index}>
                                      <div className="d-flex justify-content-start">
                                        {itm?.tableHeader}
                                      </div>
                                      <Divider />
                                      {itm?.data?.map((Value: NumericValue, indexNo: number) => {
                                        return (
                                          <div key={indexNo}>
                                            <div className="d-flex justify-content-between gap-5">
                                              <span>{Value.name}</span>
                                              <span>{Value.amount}</span>
                                            </div>
                                            <Divider />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </li>
                      </>
                    );
                  });
                })}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default HospitalActivity;
