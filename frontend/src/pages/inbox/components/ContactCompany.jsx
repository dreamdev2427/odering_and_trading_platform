import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Alert } from 'reactstrap';

import { InboxDataDocument, useCreateInboxMutation } from 'services/apollo';

import { BsSwal, Button, Col, Form, Input, Row } from 'atoms';
import 'assets/css/edtor.css';
import { useTranslation } from 'react-i18next';
import { FeedBackEditor } from 'components/feedback-editor/FeedbackEditor';

const ContactCompany = (props) => {
  const {isContactTheSponsorFontSwitchEnabled} = props;
  const { t } = useTranslation();
  const { _id } = useParams();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (state) => setEditorState(state);
  const history = useHistory();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [sendMessage] = useCreateInboxMutation({
    refetchQueries: [
      {
        query: InboxDataDocument,
        variables: {
          sto: Number(_id),
          limit: 70,
          offset: 0,
        },
      },
    ],
  });

  const onClick = () => {
    const data = {
      stoID: Number(_id),
      title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    return sendMessage({ variables: { data } })
      .then(({ data: res }) =>
        BsSwal.fire({
          title: 'Successfully sent',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: t('ContactCompany-BsSwal-Confirm'),
          cancelButtonText: t('ContactCompany-BsSwal-cancelButton'),
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/investor/details-message/${res.investorInboxCreate}`)
          }
        }),
      )
      .catch((err) => setError(err.message));
  };

  return (
    <div className="content">
      <div className="mt-4">
        <b>{t('Contact the company')}</b>
      </div>
      {error ? <Alert color="danger">{error}</Alert> : ''}
      <Form>
        <Row>
          <Col>
            <Input
              maxLength="100"
              name="Title"
              onChange={({ target: { value } }) => setTitle(value)}
              placeholder={t('ContactCompany-Title-placeholder')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <FeedBackEditor
              toolbarHidden={!isContactTheSponsorFontSwitchEnabled}
              editorState={editorState}
              wrapperClassName="editor-wrapper"
              editorClassName="demo-editor form-control border-input"
              onEditorStateChange={onEditorStateChange}
              placeholder={t('ContactCompany-FeedBackEditor-placeholder')}
              editorStyle={{ wordWrap: 'break-word', height: "300px"}}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button size="sm" onClick={onClick}>
              {t('Send  inquiry')}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactCompany;
