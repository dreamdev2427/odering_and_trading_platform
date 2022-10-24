import { CustomInput } from 'reactstrap';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  OptionsVoteStatisticDocument,
  useInvestorRegisterVoteMutation, useInvestorVoteOptionsQuery,
  useOptionsVoteStatisticQuery, UserVotingDataDocument,
  useUserVotingDataQuery,
} from 'services/apollo';
import { Button, Col, DocumentLink, Loading, Row } from 'atoms';
import { RadioBlock } from 'components/RadioBlock';
import { VoteStatistic } from './VoteStatistic';


const VotingOptions = ({ votingId, companyType }) => {
  /* hook  */
  const { t } = useTranslation();

  /* state */
  const [votedOptions, setVoteOptions] = useState({});
  const [error, setError] = useState('');

  /* gql */
  const { data: voteData, loading } = useInvestorVoteOptionsQuery({ variables: { meetingId: votingId } })
  const { data: statistic } = useOptionsVoteStatisticQuery({ variables: { votingId } })
  const { data } = useUserVotingDataQuery({ variables: { votingId } });
  const [vote] = useInvestorRegisterVoteMutation();

  if (loading) return <Loading />

  /* methods */
  const submitAgendaChoise = (opt, val) => {
    return vote({
      variables: {
        data: {
          type: companyType,
          optionID: opt.ID,
          meetingID: votingId,
          vote: val,
        },
      },
      refetchQueries: [
        { query: UserVotingDataDocument, variables: { votingId } },
        { query: OptionsVoteStatisticDocument, variables: { votingId } }
      ],
    })
      .catch((err) => setError(err.message));
  };


  const { investorVotingOptions: voteDataOptions } =  voteData || {};
  const { investorUserVoting = [] } = data || {};
  const { investorVotingOptions = [] } =  statistic || {};

  const isVoteExist = (vID) => investorUserVoting?.find((elem) => elem.votingOptionID === vID);
  const voteStat = (vID) => (investorVotingOptions?.find((elem) => elem.ID === vID) || {});
  return voteDataOptions?.map((voteOpt) => (
    <div key={voteOpt.ID}>
      <Row>
        <Col>
          <div className="bg-light w-100 p-2 fs-18 ">{voteOpt.optionTxt}</div>
        </Col>
      </Row>
      {voteOpt.description && (
        <Row className="mb-2">
          <Col>
            <AgendaItemCaption className="p-2 fs-16">{voteOpt.description}</AgendaItemCaption>
          </Col>
        </Row>
      )}
      <Row>
        {voteOpt.documents.length ? (
          <Col md={7}>
            {voteOpt.documents?.map((doc) => (
              <Row key={doc.ID}>
                <Col md={9}>
                  <img src="/img/document2.png" className="mr-2" width="30px" />
                  {doc.title} - {doc.description}
                </Col>
                <Col md={3}>
                  <DocumentLink link={doc.documentLink} title={t('Download')} />
                </Col>
              </Row>
            ))}
          </Col>
        ) : null}
        <Col md={5}>
          {!isVoteExist(voteOpt.ID) ? (
            <Row>
              <Col md={7} className="pl-3 pt-1">
                <b>{t('Select your vote and submit')}</b>
                <RadioBlock>
                  <div className="radio-row">
                    <CustomInput
                      id={`${voteOpt.ID}_1`}
                      type="radio"
                      onChange={() => {
                        if (votedOptions[voteOpt.optionTxt] !== 1) {
                          setVoteOptions({ ...votedOptions, [voteOpt.optionTxt]: 1 });
                        }
                      }}
                      checked={votedOptions[voteOpt.optionTxt] === 1 && 'checked'}
                    />
                    {t('Yes')}
                  </div>
                  <div className="radio-row">
                    <CustomInput
                      id={`${voteOpt.ID}_2`}
                      type="radio"
                      onChange={() => {
                        if (votedOptions[voteOpt.optionTxt] !== 2) {
                          setVoteOptions({ ...votedOptions, [voteOpt.optionTxt]: 2 });
                        }
                      }}
                      checked={votedOptions[voteOpt.optionTxt] === 2 && 'checked'}
                    />
                    {t('No')}
                  </div>
                  <div className="radio-row">
                    <CustomInput
                      id={`${voteOpt.ID}_3`}
                      type="radio"
                      onChange={() => {
                        if (votedOptions[voteOpt.optionTxt] !== 3) {
                          setVoteOptions({ ...votedOptions, [voteOpt.optionTxt]: 3 });
                        }
                      }}
                      checked={votedOptions[voteOpt.optionTxt] === 3 && 'checked'}
                    />
                    {t('Abstention')}
                  </div>
                  <Button size="sm" type="button"
                          onClick={() => submitAgendaChoise(voteOpt, votedOptions[voteOpt.optionTxt])}>
                    {t('Submit')}
                  </Button>
                </RadioBlock>
              </Col>
            </Row>
          ) : (
            <VoteStatistic stat={voteStat(voteOpt.ID)} />
          )}
        </Col>
      </Row>
    </div>
  ));
};

export default VotingOptions;

const AgendaItemCaption = styled.span`
  font-size: 0.8571em;
  margin-bottom: 5px;
  color: #9a9a9a;
`;
