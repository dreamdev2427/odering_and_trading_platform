import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomInput } from 'reactstrap';
import { CheckBox, FontAweIcon } from 'atoms';
import { CardHeader } from '../../components/card-header/CardHeader';
import { Button, Card, CardBody, Col, DocumentLink, Input, Row, Select } from '../../atoms';
import FileUploadKYC from './components/FileUploadKYC';
import PersonalInformation from './PersonalInformation';
import {
  InvestorKycDocument, MeDocument,
  useApplyKycMutation,
  useFillKycMutation,
  useInvestorKycQuery,
} from '../../services/apollo';
import WizardComplete from './WizardComplete';
import IdentityUpload from './components/IdentityUpload';

const CustomKYC = ({ data, history, match }) => {
  const { data: serverKycdata } = useInvestorKycQuery();
  const [FillKyc] = useFillKycMutation(data);
  const [applyKyc] = useApplyKycMutation();
  const { t } = useTranslation();
  const [state, setState] = useState({});
  const [checkState, setCheck] = useState({});
  const [ wizzardComplete, setWizzard ] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const { investorKyc } = serverKycdata || {};
    if (investorKyc) {
      setState(investorKyc);
    }
    return () => {
      setState({});
      setCheck({});
    }
  },[serverKycdata, data, match.params.id ]);

  let nextStepRoute = ''
  const page = data.find((e, i) => {
    if (e.name === match.params.id) {
      nextStepRoute = data[i+1]?.name;
      return true;
    }
    return false;
  });
  if (!page && data.length > 0) {
    return <Redirect to={data[0].name} />
  }
  const { pages: content } = page;
  const isLastStep = page.name === data[data.length - 1].name;

  const validateState = () => {
    let result = true
    const checkNew = {...checkState};
    for (const key of Object.keys(checkState)) {
      if (!state[key]) {
        checkNew[key] = true;
        result = false;
      }
    }
    setCheck(checkNew);
    return result;
  };

  const nextStep = () => {
    history.push(`/kyc-process/${nextStepRoute}`);
  }

  const removeFile = (file, name) => {
    setState((prev) => {
      let stateFiles = [...prev[name]];
      stateFiles = stateFiles.filter((f) => f.name !== file);
      submit({ ...prev, [name]: stateFiles });
      return { ...prev, [name]: stateFiles };
    });
  };

  const getFile = (file) => ({ link: file.link, name: file.name });

  const addfile = (file, name) => {
    const newState = state[name] ? [...state[name]] : [];
    newState.push(getFile(file));
    setState({ ...state, [name]: newState });
    submit({ ...state, [name]: newState });
    setError('');
  };

  const addFile = (file, name) => {
    setState((prev) => {
      const files = prev[name] ? [...prev[name]]  : [];
      files.push(file);

      const newState = { ...prev, [name]: files };
      submit(newState);
      return newState;
    });
  };

  const onChange = (name, value ) => {
    if (value && checkState[name]) checkState[name] = false;
    setState(() => ({ ...state, [name]: value }));
  };

  const submit = (result) => {
    let kyc = { ...state };
    if (typeof result === 'object') {
      kyc = { ...result };
    }
    if (typeof result === 'number') {
      kyc.apply = result;
    }
    if (page.name === 'investor-documents') {
      if (!state['investor-documents']?.length || (typeof result !== 'object' && !validateState())) {
        setError('No File Selected');
        return;
      }
    }

    FillKyc({
      variables: { data: result || state },
      refetchQueries: [{ query: InvestorKycDocument }]
    })
      .then(() => {
        if (nextStepRoute) {
          nextStep();
        } else if (typeof result === 'number') {
            applyKyc({variables: {applied: true},
              refetchQueries: [{ query: MeDocument }]
            });
            setWizzard(true);
          }
      })
      .catch((err) => console.log(err.message));
  };


  const transValue = (val) => {
    return  (val && t(val)) || val || '';
  }

  if (wizzardComplete) {
    return <WizardComplete />
  }

  return (
    <>
      {page && page.name === 'investor-info' && (<PersonalInformation nextStep={nextStep} />) }
      {Object.keys(content).map((key, i) => {
        const last = i === Object.keys(content).length - 1;
        return (
          <Card key={key}>
            <CardHeader text={transValue(content[key]?.title)} caption={transValue(content[key]?.name) || 'none'} />
            <CardBody>
              {content[key].fields.map((element) => {
                const uniq = Math.random().toString(36).substring(2);
                if (checkState[element.name] === undefined && (element.required)) {
                  checkState[element.name] = false;
                }
                switch(element.type) {
                  case 'h4':
                    return (<h4 key={uniq}>{transValue(element.values[0].value)}</h4>)
                  case 'html':
                    return (
                      <div
                        key={uniq}
                        className={element.inline ? 'd-inline-block minw-300' : 'd-flex'}
                        dangerouslySetInnerHTML={{__html: transValue(element.values[0].value)}}
                      />
                    )
                  case 'image':
                    return (<img key={uniq} src={element.src} alt="kyc" className="img-fluid" />)
                  case 'select':
                    return (
                      <div
                        className={`mt-1 mb-1 mr-3 ${element.inline && 'd-inline-block minw-300'}`}
                        key={element.name}
                      >
                        <div
                          className="mb-2"
                          style={{ maxWidth: '300px', display: 'inline'}}
                        >
                          {transValue(element.label)}
                        </div>
                        <Select
                          invalid={checkState[element.name]}
                          onChange={(option) => onChange(element.name, option.value)}
                          value={element?.values.length > 0 && element.values.find((e) => e.value === state[element.name])}
                          placeholder={transValue(element.placeholder)}
                          options={element.values}
                        />
                      </div>
                    )
                  case 'number':
                    return (
                      <div className="mt-3 mb-3" key={element.name}>
                        {transValue(element.label)}
                        <Input
                          type="number"
                          invalid={checkState[element.name]}
                          pattern="\d*"
                          placeholder={transValue(element.placeholder)}
                          value={state[element.name] || ''}
                          onChange={(e) => onChange(element.name, e.currentTarget.value)}
                        />
                      </div>
                    )
                  case 'input':
                    return (
                      <div className="mt-1 mb-3" key={element.name}>
                        {transValue(element.label)}
                        <Input
                          type="text"
                          invalid={checkState[element.name]}
                          placeholder={transValue(element.placeholder)}
                          value={state[element.name] || ''}
                          onChange={(e) => onChange(element.name, e.currentTarget.value)}
                        />
                      </div>
                    )
                  case 'upload':
                    return (
                      <div className="mt-3 mb-3" key={element.name}>
                        {state[element.name]?.map((file) => (
                          <div key={file.name}>
                            <DocumentLink link={file.link} title={file.name} />
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => removeFile(file.name, element.name)}>
                              <FontAweIcon icon="trash" />
                            </Button>
                          </div>
                        ))}
                        <FileUploadKYC
                          btnText={transValue(element.label)}
                          field={element.name}
                          afterUpload={(file) => addfile(file, element.name)}
                        />

                        <br/>
                        <span style={{ color: 'red' }}>
                          <b>{t(error)}</b>
                        </span>
                      </div>
                    )
                  case 'upload-identity':
                    return (
                      <IdentityUpload
                        files={state[element.name]}
                        addFile={(file) => addFile(file, element.name)}
                        removeFile={(filename) => removeFile(filename, element.name)}
                      />
                    );
                  case 'check-box':
                    return (
                      <div className="float-left mr-5 d-inline" key={element.name}>
                        <div className="bg-light p-2 fs-18">
                          {transValue(element.label)}
                        </div>
                        {element?.values.map((checkBox) => (
                          <div className="mt-3 mb-3 " key={checkBox.label}>
                            <CheckBox
                              id={checkBox.label}
                              type="checkbox"
                              className="z-none mx-2"
                              checked={state[element.name]?.includes(checkBox.value) || false}
                              onChange={() => {
                                if (state[element.name]?.includes(checkBox.value)) {
                                  onChange(element.name, state[element.name].filter((val) => val !== checkBox.value));
                                } else {
                                  onChange(element.name, [...(state[element.name] || []), checkBox.value]);
                                }
                              }}
                              label={transValue(checkBox.label)}
                            />
                          </div>
                        ))
                        }
                      </div>
                    );
                  case 'radio':
                    return element?.values.map((radio) => (
                      <div className="mt-3 mb-3" key={radio.value}>
                        <CustomInput
                          id={radio.value}
                          invalid={checkState[element.name]}
                          className="z-none mx-2"
                          type="radio"
                          checked={state[element.name] === radio.value}
                          onChange={() => onChange(element.name, radio.value)}
                          label={transValue(radio.label)}
                        />
                      </div>
                    ));
                  default:
                    return null;
                }
              })}
              {last && (isLastStep ? (
                <Row>
                  <Col>
                    <Button onClick={() => submit(4)} className="rounded-pill mr-2">
                      {t("Apply")}
                    </Button>
                  </Col>
                </Row>
              ) : (
                  <Row className="mt-3 w-100">
                    <Col>
                      <Button onClick={() => submit()}>{t('SaveAndNext')}</Button>
                      <Button onClick={() => nextStep()}>{t('NextWithoutSave')}</Button>
                    </Col>
                  </Row>
              ))}
            </CardBody>
          </Card>)
      })}
    </>
  )
}

export default withRouter(CustomKYC);
