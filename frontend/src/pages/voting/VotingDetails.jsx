import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Col, Loading, Row } from '../../atoms';
import { useActiveSto } from '../../hooks';
import { useInvestorMeetingQuery } from '../../services/apollo';

const VotingDetails = () => {
  const params = useParams(); // <{ _id: string }>
  const { t } = useTranslation();
  const { sto } = useActiveSto();
  const isMeetOpen = true;

  const { data, loading } = useInvestorMeetingQuery({
    variables: {
      meetingId: Number(params._id),
      _id: sto,
    },
  });

  if (loading || !data) return <Loading />;
  const { investorMeeting: vote, investorVotingOptions: options } = data || {};
  // const { companyType } = findSto;

  return (
    <div className="content">
      <Row id="report">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <Row>
                <Col md={9} >
                  <h4 className="title">
                    <img src="/img/voting.png" width="30px;" style={{ paddingBottom: '-10px' }} />
                    {t('Voting Details')}
                  </h4>
                </Col>
                <div className="col-md-3">
                  <Button
                    type="button"
                    onClick="generatePDF('report')"
                    className="btn btn-info btn-fill"
                    data-html2canvas-ignore="true"
                  >
                    {t('Print / Download PDF')}
                  </Button>
                </div>
              </Row>
            </div>
            <div className="content">
              <Row>
                <div className="col-md-12">
                  <h3>{vote.title}</h3>
                  <label>
                    {vote.voteType === 1 && t('Voting per user')}
                    {vote.voteType === 2 && t('Voting according to the number of shares')}
                    {vote.voteType === 3 && t('Voting according to the amount invested')}
                  </label>
                  <label>{t('Voting Started')} </label> &nbsp; {vote.openDate}
                  <label>{t('Voting Finish')} </label> &nbsp; {vote.closeDate}
                  {vote.contents}
                </div>
              </Row>


            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default VotingDetails;


// <Row>
//   <Col md={7}>
//     {vote.voteType === 2 && vote.open  && InvestorShares ? (
//       <span style={{ color: 'black', fontSize: '18px' }}>
//                       Your vote will contribute {InvestorShares} shares to selected option
//                     </span>
//     ) : (
//       <span style="color:red; font-size:18px;">
//                       You cannot cast your vote because you do not have any shares in this STO
//                     </span>
//     )}
//
//     {vote.voteType === 3 &&
//     (InvestorShares ? (
//       <span style={{color:'black', fontSize:'18px'}}>
//                         Your vote will contribute {InvestorInvestment} investment votes to selected option
//                       </span>
//     ) : (
//       <span style={{ color:'red', fontSize:'18px'}}>
//                         You cannot cast your vote because you do not have any shares in this STO
//                       </span>
//     ))}
//
//     <h4>{t('Available-Options')}</h4>
//
//     {vote.voteType === 1 &&
//     Optionvote.map((elem) => (
//       <Row>
//         <div className="col-md-6">{elem.optiontxt}</div>
//         <div className="col-md-6">
//           {vote.open === 2 && (
//             <Button
//               fill
//               size="sm"
//               color="info"
//               onclick="castVote({{../id}}, {{this.id}}, {{../stoid}})"
//             >
//               {t('Vote')}
//             </Button>
//           )}
//           {`${elem.count} Votes (${elem.PercentInvestorCount} % )`}
//         </div>
//       </Row>
//     ))}
//
//     {[2, 3].includes(vote.voteType) &&
//     Sharesvote.map((voteOpt) => (
//       <Row key={voteOpt.ID}>
//         <div className="col-md-6">{voteOpt.optiontxt}</div>
//         <div className="col-md-6">
//           {open === 2 && InvestorShares && (
//             <Button
//               fill
//               size="sm"
//               type="button"
//               onClick="castVote({{../id}}, {{this.id}}, {{../stoid}})"
//             >
//               {t('Vote')}
//             </Button>
//           )}
//           {vote.votetype === 2 && `${this.count}  Shares ( ${this.Percent} % )`}
//           {vote.votetype === 3 && `${this.investment} ( ${this.PercentInvestment} % )`}
//         </div>
//       </Row>
//     ))}
//
//     {InvestorShares &&
//     (userSelection && open === 2 ? (
//       <span style={{ color: 'green', fontSize: '18px' }}>
//                         You voted for "{userSelectionOption}" You can still change your selection by clicking different
//                         vote Button
//                       </span>
//     ) : (
//       <span style={{ color: 'red', fontSize: '18px' }}>
//                         You have not made any selection. Please select one option and click Vote
//                       </span>
//     ))}
//
//     <h4>{t('Summary')}</h4>
//
//     <Row>
//       <Col md={7}> {t('Votes exercised')} </Col>
//       <Col md={4}> {VotesCasted} </Col>
//     </Row>
//
//     <Row>
//       <Col md={7}> {t('Total Investors')} </Col>
//       <Col md={4}> {TotalInvestorsInSTO} </Col>
//     </Row>
//
//     <Row>
//       <Col md={7}> {t('Votes not yet exercised')} </Col>
//       <Col md={4}> {' subtractTovalue TotalInvestorsInSTO VotesCasted'} </Col>
//     </Row>
//   </Col>
//   <Col md={4}>
//     <canvas id="myChart2" width="100" height="100" />
//   </Col>
// </Row>
