import React, { FC, useContext, useState } from 'react';
import { ThemeContext, ThemeContextType } from 'lib/themes/themeController';

import { CustomInput, Button } from 'reactstrap';
import { useTheme } from 'styled-components';
import { Col, FormGroup, Label, Row } from 'atoms';
import { useTranslation } from 'react-i18next';
import { colors } from '../../lib/themes/colors';
import { useModal } from '../Modal';
import { useSetThemeConfigMutation } from '../../services/apollo';
import { defaultTheme, MarketSpaceTheme } from '../../lib/themes/defaultTheme';
import { ThemePropertyButton, FixedPanel } from './styled/styled';
import { ColorPicker } from './components/ColorPicker';
import { ThemeType } from '../../lib/themes/themeTypes';

const defaultThemes = [
  { title: 'Default', value: defaultTheme },
  { title: 'MarketSpace', value: MarketSpaceTheme },
];

const FixedPluginContent: FC = () => {
  const { setTheme } = useContext<ThemeContextType>(ThemeContext);
  const [uploadThemeConfig] = useSetThemeConfigMutation();
  const { t } = useTranslation();
  const modal = useModal();
  const theme: ThemeType = useTheme() as ThemeType;

  const [oldConfig] = useState({ ...theme });

  const handleChange = (property: keyof ThemeType, color: string | boolean) => {
    console.log(color);
    if (setTheme !== null) {
      setTheme({
        ...theme,
        [property]: color,
      });
    }
  };

  const sidebarBGColors = [...Object.values(colors)].slice(0, 5);
  const sidebarFontsColor = [...Object.values(colors)].slice(5, 10);
  const fontWeigths = ['bold', 'bolder', 'normal', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800'];
  const cornerTypes = ['boxy', 'light-round', 'rounded', 'default'];

  return (
    <FixedPanel>
      <Row>
        <Col>
          <h2>{t('layout-settings')}</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Label>{t('predefined-theme')}</Label>
        </Col>
        <Col md={4}>
          {defaultThemes.map((defTheme) => (
            <ThemePropertyButton
              key={defTheme.title}
              className="p-2"
              onClick={() => setTheme(defTheme.value)}
              background={defTheme.value.backgroundSideBar}
              active={theme.backgroundSideBar === defTheme.value.backgroundSideBar}
            >
              {defTheme.title}
            </ThemePropertyButton>
          ))}
        </Col>
      </Row>
      <hr />
      <br />
      <h1>{t('nav-menu-bar')}</h1>
      <hr />
      <Row>
        <Col md={6}>
          <Label>{t('extend-nav-menu-bar')}</Label>
        </Col>
        <Col md={1}>
          <FormGroup switch>
            <CustomInput
              id="two-factor"
              type="switch"
              inline
              onChange={() => {
                handleChange('extendedNavigationBar', !theme.extendedNavigationBar);
              }}
              checked={theme.extendedNavigationBar}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Label>{t('background')}</Label>
        </Col>
        <Col md={1} className="badge-colors">
          {sidebarBGColors.map((cl) => (
            <span
              key={cl}
              className={theme.backgroundSideBar === cl ? 'badge badge-default active' : 'badge badge-default'}
              data-color="black"
              style={{ background: cl }}
              onClick={() => {
                handleChange('backgroundSideBar', cl);
              }}
            />
          ))}
        </Col>
        <Col md={2}>
          <ColorPicker
            currentColor={theme.backgroundSideBar}
            property="backgroundSideBar"
            handleChangeColor={handleChange}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Label>{t('font-color')}</Label>
        </Col>
        <Col md={1} className="badge-colors">
          {sidebarFontsColor.map((cl) => (
            <span
              key={cl}
              className={theme.fontColorSideBar === cl ? 'badge  badge-default active' : 'badge  badge-default'}
              data-color="black"
              style={{
                background: cl,
              }}
              onClick={() => {
                handleChange('fontColorSideBar', cl);
              }}
            />
          ))}
        </Col>
        <Col md={2}>
          <ColorPicker
            currentColor={theme.fontColorSideBar}
            property="fontColorSideBar"
            handleChangeColor={handleChange}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <Label>{t('font-color-active-item')}</Label>
        </Col>
        <Col md={1} className="badge-colors">
          {sidebarFontsColor.map((cl) => (
            <span
              key={cl}
              className={theme.fontActiveItemSideBar === cl ? 'badge  badge-default active' : 'badge  badge-default'}
              data-color="black"
              style={{
                background: cl,
              }}
              onClick={() => {
                handleChange('fontActiveItemSideBar', cl);
              }}
            />
          ))}
        </Col>
        <Col md={2}>
          <ColorPicker
            currentColor={theme.fontActiveItemSideBar}
            property="fontActiveItemSideBar"
            handleChangeColor={handleChange}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={2}>
          <Label>{t('font-weight')}</Label>
        </Col>
        <Col md={6}>
          {fontWeigths.map((title) => (
            <ThemePropertyButton
              key={title}
              className="btn-outline-primary m-1"
              active={theme.fontWeightSideBar === title}
              onClick={() => {
                handleChange('fontWeightSideBar', title);
              }}
            >
              {title}
            </ThemePropertyButton>
          ))}
        </Col>
      </Row>
      <hr />
      <br />
      <h1>{t('application')}</h1>
      <hr />
      <Row>
        <Col md={2}>
          <Label>{t('corner-type')}</Label>
        </Col>
        <Col md={6}>
          {cornerTypes.map((title) => (
            <ThemePropertyButton
              key={title}
              className="btn-outline-primary"
              active={theme.typeAppCorner === title}
              onClick={() => {
                handleChange('typeAppCorner', title);
              }}
            >
              {title}
            </ThemePropertyButton>
          ))}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={1}>
          <Label>{t('font-color-controls')}</Label>
        </Col>
        <Col md={1}>
          <ColorPicker currentColor={theme.colorControls} property="colorControls" handleChangeColor={handleChange} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={1}>
          <Label>{t('controls-colors')}</Label>
        </Col>
        <Col md={1}>
          <ColorPicker
            currentColor={theme.colorControlsFont}
            property="colorControlsFont"
            handleChangeColor={handleChange}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={1}>
          <Label>{t('background-app-color')}</Label>
        </Col>
        <Col md={1}>
          <ColorPicker currentColor={theme.backgroundApp} property="backgroundApp" handleChangeColor={handleChange} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button
            color="success"
            onClick={() => {
              uploadThemeConfig({ variables: { theme: JSON.stringify(theme) } });
              modal.hideModal();
            }}
            style={{ float: 'right', width: '10rem' }}
          >
            {t('Save')}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setTheme(oldConfig);
              modal.hideModal();
            }}
            style={{ float: 'right', width: '10rem', color: 'FF0000' }}
          >
            {t('Cancel')}
          </Button>
        </Col>
      </Row>
    </FixedPanel>
  );
};

export default FixedPluginContent;
