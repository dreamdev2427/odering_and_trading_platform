import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Col, Row } from 'atoms';
import { useGetInvitationLinkQuery, useGetInvestorCommissionsSumQuery } from 'services/apollo';
import { CardHeader } from '../../components/card-header/CardHeader';

const TellFriends = () => {
  const { t } = useTranslation();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { data } = useGetInvitationLinkQuery({
    fetchPolicy: 'no-cache',
  });

  const { data: commissionData } = useGetInvestorCommissionsSumQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data) {
      const { getInvitationLink } = data;
      setEditorState(EditorState.createWithContent(ContentState.createFromText(getInvitationLink)));
    }
  }, [data]);

  const onEditorStateChange = (state) => setEditorState(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Sending Email With The Editor's Content
  };

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('Invite-a-friend')}
          caption={t('Do-you-know-investors-in-or-managers-of-private-companies')}
          imgSrc="/img/user.png"
        />
        <CardBody className="mb-2">
          <p>
            <span className="font-weight-bold">{t('Collected-Commissions')}</span>
            <strong>
              <mark className="text-info">
                {commissionData?.getInvestorCommissionsSum ? commissionData.getInvestorCommissionsSum : 0}
              </mark>
            </strong>
            <small>{t('Pending')}</small>
          </p>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="email-address">{t('Email-Address')}</Label>
                  <Input
                    id="email-address"
                    name="emailAddress"
                    type="email"
                    maxLength="70"
                    placeholder={t('Email-Address')}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label htmlFor="invitation-text">{t('Enter-invitation-text')}</Label>
                  <Editor
                    id="invitation-text"
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor form-control border-input h-editor"
                    onEditorStateChange={onEditorStateChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">
              {t('Send-Proposal')}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default TellFriends;
