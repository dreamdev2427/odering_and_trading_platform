import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Input, StoLogo } from 'atoms';


const Factor = () => {
    const [factor, setFactor] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div className="login-page">
            <Container>
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <div className="mb-1 logo-img red-swan-custom">
                                {StoLogo()}
                            </div>
                            <h1>2 Factor Authenication</h1>
                        </div>

                        <Form id="Login" onSubmit={onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    maxLength="70"
                                    placeholder="Email Username"
                                    value={factor}
                                    onChange={(e) => setFactor(e.currentTarget.value)}
                                />
                            </FormGroup>
                            <br />
                            <Button type="submit" color="info" block size="lg">
                                Authenicate
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Factor;