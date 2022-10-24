import React, { FC, useState } from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { ThemeType } from 'lib/themes/themeTypes';

type ColorPickerProps = {
  currentColor: string | undefined;
  property: keyof ThemeType;
  handleChangeColor: (name: keyof ThemeType, value: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({ currentColor, property, handleChangeColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  return (
    <div className="ml-2">
      <Swatch
        onClick={() => {
          setDisplayColorPicker(!displayColorPicker);
        }}
      >
        <ColorBlock currentColor={currentColor} />
      </Swatch>
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={() => setDisplayColorPicker(false)} />
          <ChromePicker color={currentColor} onChange={(e) => property && handleChangeColor(property, e.hex)} />
        </Popover>
      ) : null}
    </div>
  );
};

const Popover = styled.div`
  position: absolute;
  left: 70px;
  bottom: 30px;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

const ColorBlock = styled.div<{ currentColor: string | undefined }>`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${(p) => p.currentColor};
`;
