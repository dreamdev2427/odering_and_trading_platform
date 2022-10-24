import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/web-sdk';
import { Card, CardBody, Col, Loading, Row } from '../../atoms';
import { CardHeader } from '../../components/card-header/CardHeader';
import { useInvestorMeetingQuery, useMeQuery } from '../../services/apollo';
import { useActiveSto } from '../../hooks';
import VotingOptions from './components/VotingOptions';

const MeetingDetails = () => {
  const votingId = Number(useParams()?._id);
  const { t } = useTranslation();
  const { sto } = useActiveSto();
  const isMeetOpen = true;
  const { data: data1, loading: load1 } = useMeQuery();
  const { investor } = data1?.investorUser || {};

  const { data, loading } = useInvestorMeetingQuery({
    variables: {
      meetingId: votingId,
      _id: sto,
    },
  });

  if (loading || !data || !data1 || load1) return <Loading />;

  const { investorMeeting, findSto } = data || {};
  const { companyType } = findSto;

  return (
    <div className="content">
      <Card>
        <CardHeader text={`${t('Meeting')} - ${investorMeeting.title}`} imgSrc="/img/meeting.png" />
        <CardBody>
          <Row>
            <Col className="p-3">
              <JitsiMeeting
                domain="meet.digishares.live"
                roomName={investorMeeting.title}
                configOverwrite={{
                  disablePolls: true,
                  startWithVideoMuted: true,
                  startWithAudioMuted: true,
                  prejoinPageEnabled: false,
                  disableAGC: true,
                  disableModeratorIndicator: true,
                }}
                interfaceConfigOverwrite={{
                  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                  TOOLBAR_BUTTONS: ['chat'],
                }}
                userInfo={{
                  displayName: investor.userName,
                }}
                onApiReady={(externalApi) => {
                  // log dataChannelOpened
                  // externalApi.on('incomingMessage', (dt) => {
                  //   console.log('------- data -----: ', dt);
                  // });
                }}
                getIFrameRef={(iframe) => {
                  iframe.style.height = '600px';
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="bg-light w-100 p-2 fs-18 ">Information</div>
              <Row className="mb-2 ml-2">
                <Col>{investorMeeting.contents}</Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Col md={3} className="fs-16 minw-200">
                    <label>{t('Time')}</label>
                  </Col>
                  <Col md={6}>
                  <div className="ml-2 minw-200 d-inline-block mb-1">
                    <img src="/img/date.png" width="20px;" className="mr-2" />
                    {new Date(investorMeeting.openDate).toDateString()}
                  </div>
                  <div className="minw-200 d-inline-block mb-1 ml-2">
                    <img src="/img/time.png" width="20px;" className="mr-2" />
                    <span className="mr-1">{new Date(investorMeeting.openDate).toLocaleTimeString()}</span>
                    to
                    <span className="ml-1">{new Date(investorMeeting.closeDate).toLocaleTimeString()}</span>
                    <span className="fa-w-12 ml-2 px-1 badges badge-info rounded">
                      {investorMeeting.timezone} - {investorMeeting.timePadding}
                    </span>
                  </div>
                </Col>
                </Col>
              </Row>

              {(investorMeeting.nameResponsiblePerson ||
                investorMeeting.phoneResponsiblePerson ||
                investorMeeting.emailResponsiblePerson) && (
                <Row className="mb-2">
                  <Col>
                    <Col md={3} className="fs-16 minw-200">
                      <label>{t('Responsible Person')}</label>
                    </Col>
                    <Col>
                    {investorMeeting.nameResponsiblePerson && (
                      <div className="minw-200 d-inline-block mb-1 ml-2">
                        <img src="/img/user.png" width="20px" className="mr-2" />
                        <span className="mr-1">{investorMeeting.nameResponsiblePerson}</span>
                      </div>
                    )}
                    {investorMeeting.phoneResponsiblePerson && (
                      <div className="minw-200 d-inline-block mb-1 ml-2">
                        <i className="ti-mobile fs-20 align-self-center mr-2" style={{ color: '#239fdb' }} />
                        <span className="mr-1">{investorMeeting.phoneResponsiblePerson}</span>
                      </div>
                    )}
                    {investorMeeting.emailResponsiblePerson && (
                      <div className="w-50 minw-200 d-inline-block mb-1 ml-2">
                        <i className="ti-mobile fs-20 align-self-center mr-2" style={{ color: '#239fdb' }} />
                        <span className="mr-1">{investorMeeting.emailResponsiblePerson}</span>
                      </div>
                    )}
                  </Col>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <VotingOptions votingId={votingId} companyType={companyType} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default MeetingDetails;
