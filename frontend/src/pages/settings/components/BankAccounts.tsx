import React, { ChangeEvent, useState } from 'react';
import { BsSwal, Button, Card, CardBody, Col, FormGroup, Input, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { Form, Label } from 'reactstrap';
import BANK from 'assets/img/bank.png';
import { InvestorBankAccountInput, useAddNewInvestorBankAccountMutation } from 'services/apollo';

const fillState = (): InvestorBankAccountInput => {
  return {
    accountTitle: '',
    accountNo: '',
    routingNumber: '',
    iban: '',
    accountHolderName: '',
    accountHolderCity: '',
    accountHolderCountry: '',
    accountHolderAddress: '',
    accountPostalCode: '',
    bankName: '',
    bankCity: '',
    bankCountry: '',
    bankAddress: '',
    swift: '',
  };
};

const BankAccount: React.FC = () => {
  const [details, setDetails] = useState(fillState());

  const [addAccount] = useAddNewInvestorBankAccountMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setDetails((prevState) => ({ ...prevState, ...newState }));
  };

  const onSubmit = () => {
    addAccount({
      variables: { data: details },
    })
      .then(() => {
        BsSwal.fire({
          title: 'Successfully added a new bank account',
          icon: 'success',
        });
        setDetails(fillState());
      })
      .catch((err) =>
        BsSwal.fire({
          title: err,
          icon: 'success',
        }),
      );
  };

  return (
    <Card>
      <CardHeader text="Bank Account Form" imgSrc={BANK} caption="Add a new Bank Account" />
      <CardBody>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="bankName">Bank Name</Label>
                <Input
                  onChange={handleInputChange}
                  id="bankName"
                  placeholder="Bank Name"
                  value={details.bankName}
                  name="bankName"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="bankCity">Bank City</Label>
                <Input
                  onChange={handleInputChange}
                  id="bankCity"
                  name="bankCity"
                  placeholder="Bank' City"
                  value={details.bankCity}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="bankCountry">Bank Country</Label>
                <Input
                  onChange={handleInputChange}
                  id="bankCountry"
                  name="bankCountry"
                  placeholder="Bank' Country"
                  value={details.bankCountry}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="bankAddress">Bank Address</Label>
                <Input
                  onChange={handleInputChange}
                  id="bankAddress"
                  name="bankAddress"
                  placeholder="Bank' Address"
                  value={details.bankAddress}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleEmail">Account Holder Name</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountHolderName"
                  name="accountHolderName"
                  placeholder="Name"
                  value={details.accountHolderName}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="examplePassword">Account Holder City</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountHolderCity"
                  name="accountHolderCity"
                  placeholder="City"
                  value={details.accountHolderCity}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="examplePassword">AccountHolder Country</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountHolderCountry"
                  name="accountHolderCountry"
                  placeholder="Country"
                  value={details.accountHolderCountry}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="examplePassword">AccountHolder Address</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountHolderAddress"
                  name="accountHolderAddress"
                  placeholder="Address"
                  value={details.accountHolderAddress}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="examplePassword">Account PostalCode</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountPostalCode"
                  name="accountPostalCode"
                  placeholder="postal-code"
                  value={details.accountPostalCode}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleAddress">Account Title</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountTitle"
                  name="accountTitle"
                  placeholder="Title"
                  value={details.accountTitle}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleAddress">Account No</Label>
                <Input
                  onChange={handleInputChange}
                  id="accountNo"
                  name="accountNo"
                  value={details.accountNo}
                  placeholder="accountNo"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleAddress">Routing Number</Label>
                <Input
                  onChange={handleInputChange}
                  id="routingNumber"
                  name="routingNumber"
                  value={details.routingNumber}
                  placeholder="Routing Number"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleAddress">Iban</Label>
                <Input onChange={handleInputChange} id="iban" name="iban" placeholder="Iban" value={details.iban} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="swift">Swift</Label>
                <Input onChange={handleInputChange} id="swift" name="swift" placeholder="Swift" value={details.swift} />
              </FormGroup>
            </Col>
          </Row>
          <Button onClick={onSubmit}>Add</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BankAccount;
