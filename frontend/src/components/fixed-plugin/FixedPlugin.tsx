import React, { FC } from 'react';
import FixedPluginContent from 'components/fixed-plugin/FixedPluginContent';
import { useModal } from '../Modal';

const FixedPlugin: FC = () => {
  const modal = useModal();

  const handleShowModal = () => {
    modal.showModal({
      className: 'w-50 mw-100',
      submitText: 'Save',
      showFooter: false,
      cancelText: 'Cancel',
      bodyContent: () => <FixedPluginContent />,
    });
  };

  const handleClick = () => {
    handleShowModal();
  };

  return (
    <div className="fixed-plugin">
      <div onClick={handleClick}>
        <i className="fa fa-cog fa-2x" />
      </div>
    </div>
  );
};

export default FixedPlugin;
