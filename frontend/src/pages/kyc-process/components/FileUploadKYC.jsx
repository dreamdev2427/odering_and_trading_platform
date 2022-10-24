import React, { useRef } from 'react';
import { Spinner } from 'reactstrap';
import { Button } from 'atoms';
import { useTranslation } from 'react-i18next';
import { useUploadMutation } from '../../../services/apollo';

const FileUploadKYC = ({ afterUpload, btnText }) => {
  const [uploadFile, { loading }] = useUploadMutation();
  const inputEl = useRef(null);
  const { t } = useTranslation();

  const onClick = () => inputEl.current.click();
  const startUpload = (e) => {
    const [file] = e.currentTarget.files;
    if (!file) {
      return;
    }
   return uploadFile({ variables: { file } })
      .then(({ data: { fileUpload } }) => {
        afterUpload(fileUpload);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button size="md" onClick={onClick}>
        {loading ? <Spinner size="sm" color="light" /> : (btnText || t('UploadFile')) }
      </Button>
      <input className="d-none" ref={inputEl} type="file" onChange={startUpload} />
    </>
  );
};

export default FileUploadKYC;
