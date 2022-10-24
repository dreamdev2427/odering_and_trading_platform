import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { languages } from '../lib/i18';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') ?? '');

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  return (
    <UncontrolledDropdown className="mr-3 pt-1" nav>
      <DropdownToggle aria-haspopup caret color="default" data-toggle="dropdown" id="navbarDropdownMenuLink" nav>
        {languages.get(i18n.language)?.nativeName}
      </DropdownToggle>
      <DropdownMenu persist aria-labelledby="navbarDropdownMenuLink" right>
        {Array.from(languages.keys()).map((lg: string) => (
          <DropdownItem
            href="#pablo"
            key={lg}
            onClick={() => {
              setSelectedLanguage(lg);
            }}
          >
            {languages.get(lg).nativeName}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default LanguageSelector;
