import React, { FC } from 'react';
import { Col, Row } from '../atoms';

export const FooterMarketSpace: FC<{ isMarketSpace?: boolean }> = ({ isMarketSpace }) => {
  return (
    <footer className="p-0">
      <div className="w-100 footer-default text-sm-center" style={{ color: '#66615b', backgroundColor: '#00091a' }}>
        <Row>
          <Col>
            <span className="text-sm-center">
              <p>
                Powered by <a href="https://digishares.io"> columnn 1 </a>
              </p>
            </span>
          </Col>
          <Col>
            <span className="text-sm-center">
              <p>
                Powered by <a href="https://digishares.io"> columnn 2</a>
              </p>
            </span>
          </Col>
          <Col>
            <span className="text-sm-center">
              <p>
                Powered by <a href="https://digishares.io"> columnn 3</a>
              </p>
            </span>
          </Col>
        </Row>
      </div>
    </footer>
  );
};
