import React, { useRef } from 'react';
import styled from 'styled-components';

import { useUploadMutation } from 'services/apollo';

const FileUpload = ({ title, afterUpload }) => {
  const [uploadFile, { loading }] = useUploadMutation();
  const inputEl = useRef(null);

  const onClick = () => inputEl.current.click();

  const startUpload = (e) => {
    const [file] = e.currentTarget.files;
    if (!file) {
      return;
    }

    uploadFile({ variables: { file } })
      .then(({ data: { fileUpload } }) => afterUpload(fileUpload))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Wrap onClick={onClick}>{loading ? 'loading...' : title}</Wrap>
      <input className="d-none" ref={inputEl} type="file" onChange={startUpload} />
    </>
  );
};

export default FileUpload;

const Wrap = styled.div`
  background: red;
  height: 30px;
  width: 200px;
`;
