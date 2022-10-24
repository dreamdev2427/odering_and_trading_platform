import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { Alert } from 'reactstrap';

import { useActiveSto } from 'hooks';
import { InboxDataDocument, useCreateInboxMutation } from 'services/apollo';

import { Button, Card, CardBody, Form, Input, BsSwal } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from "react-i18next";

const NewMessage = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (state) => setEditorState(state);
  const history = useHistory();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [sendMessage] = useCreateInboxMutation();
  const onClick = () => {
    const data = {
      stoID: sto,
      title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    return sendMessage({
      variables: {
        data,
      },
      refetchQueries: [
        {
          query: InboxDataDocument,
          variables: {
            sto: Number(sto),
            limit: 70,
            offset: 0,
          },
        },
      ],
    })
      .then(() => {
        return BsSwal.fire({
          title: t('NewMessage-success-popUp-title'),
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/investor/inbox`);
          }
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('Send-Message-to-Company')}
          caption={t('Do-you-know-investors-in-or-managers-of-private-companies')}
          imgSrc="/img/email.png"
        />
        <CardBody className="mb-2">
          {error ? <Alert color="danger">{error}</Alert> : ''}
          <Form>
            <div className="row">
              <div className="col-md-6">
                <label>Title</label>
                <Input
                  maxLength="70"
                  name="Title"
                  onChange={({ target: { value } }) => setTitle(value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <label>{t('Enter-invitation-text')}</label>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="form-control minh-400 border-input"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
            </div>
            <div>
                <Button size="md" onClick={onClick}>
                  {t('Send-Message')}
                </Button>
            </div>
          </Form>
          <br />
        </CardBody>
      </Card>
    </div>
  );
};

export default NewMessage;
