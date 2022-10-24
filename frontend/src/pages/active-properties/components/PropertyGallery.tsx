import React from 'react';
import ImageGallery from 'react-image-gallery';

import { PropertyFile } from 'services/apollo';

interface PropertyGalleryProps {
  logo: string;
  images: PropertyFile[];
  classNames?: string | undefined;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ logo, images, classNames }) => {
  const items = [
    ...images.map((img) => ({
      original: img.url,
      thumbnail: img.url,
    })),
  ];

  return (
    <div className="d-flex mt-4 w-100">
      <ImageGallery additionalClass={classNames} items={items} />
    </div>
  );
};

export default PropertyGallery;
