import { Global } from '@emotion/react';
import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css';

const TEMPLATES_IDS = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  TERTIARY: 'TERTIARY',
};

export const AVAILABLE_TEMPLATES = {
  PRIMARY: {
    imageSrc: '',
  },
  SECONDARY: {
    imageSrc: '',
  },
  TERTIARY: {
    imageSrc: '',
  },
};

export const TemplateSlider = () => {
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES_IDS.PRIMARY);

  const targetElementRef = useRef<HTMLElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      splideInstanceRef.current = new SplideCore(targetElement, {
        perPage: 2,
        pagination: false,
        gap: '33px',
        width: '100%',
        autoHeight: true,
        perMove: 1,
      });

      splideInstanceRef.current.mount();
    }

    return () => {
      splideInstanceRef.current && splideInstanceRef.current.destroy();
    };
  }, []);

  const onChangeTemplate = (templateId: string) => {
    setActiveTemplateId(templateId);
  };

  return (
    <div>
      <Global
        styles={{
          '.splide__arrow svg': {
            fill: '#000000',
          },
          '.splide__arrow--prev': {
            left: '-2.2rem',
            backgroundColor: 'transparent',
          },
          '.splide__arrow--next': {
            right: '-2.2rem',
            backgroundColor: 'transparent',
          },
        }}
      />
      <section className="splide mt-[26px] mb-[32px]" ref={targetElementRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {Object.keys(AVAILABLE_TEMPLATES).map((templateId) => {
              const isActive = templateId === activeTemplateId;
              return (
                <TemplateSlide
                  key={templateId}
                  isActive={isActive}
                  templateId={templateId}
                  onChangeTemplate={onChangeTemplate}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export const TemplateSlide = ({
  isActive,
  templateId,
  onChangeTemplate,
}: {
  isActive: boolean;
  templateId: string;
  onChangeTemplate: (templateId: string) => void;
}) => {
  return (
    <li
      className="splide__slide hover:cursor-pointer"
      onClick={() => {
        onChangeTemplate(templateId);
      }}
    >
      <div
        className={`h-[255px] w-[179px] rounded border relative ${
          isActive ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
        }`}
      >
        {isActive && (
          <div className="absolute top-3 right-3">
            <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
          </div>
        )}
      </div>
    </li>
  );
};
