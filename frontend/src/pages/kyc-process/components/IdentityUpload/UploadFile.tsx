import React, { useEffect, useRef } from 'react';
import { Spinner } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { useUploadMutation, FileUploaded } from 'services/apollo';

import { Button } from 'atoms';

interface UploadFileProps {
  afterUpload: (link: FileUploaded) => void;
  setLoading: (value: boolean) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ afterUpload, setLoading }) => {
  const { t } = useTranslation();
  const [uploadFile, { loading }] = useUploadMutation();
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const onClick = () => inputEl.current?.click();

  const startUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (loading || !files || !files.length) {
      return;
    }

    return uploadFile({ variables: { file: files.item(0) } })
      .then(({ data }) => {
        if (data) {
          afterUpload(data.fileUpload);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button color="success" size="sm" onClick={onClick}>
        {loading ? <Spinner size="sm" color="light" /> : t('kyc.upload.upload-file')}
      </Button>
      <input className="d-none" ref={inputEl} type="file" onChange={startUpload} />
    </>
  );
};

export default UploadFile;
