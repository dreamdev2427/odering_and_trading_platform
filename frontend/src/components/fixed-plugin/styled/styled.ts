import styled, { css } from 'styled-components';

export const FixedPanel = styled.div`
  display: flex;
  position: static;
  flex-direction: column;
  background: white;
  width: 100%;

  label {
    margin-top: 12px;
    margin-bottom: 0px;
    font-size: 20px;
  }

  hr {
    width: 100%;
  }

  & > div:nth-of-type(n) {
    display: flex;
    flex-direction: row;
    margin-top: 12px;

    & > :first-child {
      width: 30%;
    }

    & > :last-child {
      margin: auto;
    }
  }

  & > div:nth-of-type(2) {
    & > :last-child {
      margin: 0 100px 0 240px;
    }
  }

  & > div:nth-of-type(3) {
    & > :last-child {
      margin: 0 100px 0 240px;
    }
  }

  & > div:nth-of-type(5) {
    & > :last-child {
      margin: 0 100px 0 240px;
    }
  }

  & section {
    margin-top: 34px;
    display: flex;
    justify-content: end;
  }

  .badge-colors {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    margin-left: 176px;
    margin-right: 120px;
  }

  .badge {
    display: inline-block;
    width: 23px;
    height: 23px;
    margin-right: 5px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    position: relative;
    cursor: pointer;

    &:hover {
      border-color: #00bbff;
    }
  }

  .active {
    box-shadow: 0 0 10px #00bbff !important;
    border: 2px solid #00bbff;
  }
`;

export const ThemePropertyButton = styled.button<{ background?: string; active: boolean }>`
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  margin: 4px;
  position: relative;
  width: auto;
  font-size: 16px;
  font-weight: normal;
  outline: none;
  &:hover,
  &:focus,
  &:active {
    color: ${(p) => (!p.background && '#00bbff') || 'white'};
    border-color: #00bbff;
    outline: none;
    overflow: hidden;
  }

  ${(p) => {
    if (p.active) {
      return css`
        box-shadow: 0 0 10px #00bbff;
        border: 2px solid #00bbff;
        color: #00bbff;
      `;
    }
  }};

  ${(p) => {
    if (p.background) {
      return `
        background: ${p.background};
        color: ${p.theme.colors.white};
      `;
    }
  }};
`;
