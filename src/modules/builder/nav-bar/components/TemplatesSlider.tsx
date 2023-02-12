// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css';

import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { useEffect, useRef } from 'react';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { Global } from '@emotion/react';
import Image from 'next/image';
import { useTemplates } from 'src/stores/useTemplate';

export const TemplateSlider = () => {
  const templateIndex = useTemplates((state) => state.activeTemplate.id);

  const targetElementRef = useRef<HTMLElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      splideInstanceRef.current = new SplideCore(targetElement, {
        perPage: 2,
        pagination: false,
        gap: '0px',
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
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[templateId]);
  };

  return (
    <div>
      <Global
        styles={{
          '.splide__arrow svg': {
            fill: '#000000',
          },
          '.splide__arrow--prev': {
            backgroundColor: 'transparent',
          },
          '.splide__arrow--next': {
            backgroundColor: 'transparent',
          },
          '.splide__arrow--prev:disabled': {
            cursor: 'not-allowed',
          },
          '.splide__arrow--next:disabled': {
            cursor: 'not-allowed',
          },
        }}
      />
      <section className="splide mt-[26px] mb-[32px] px-[40px]" ref={targetElementRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {Object.keys(AVAILABLE_TEMPLATES).map((templateKey) => {
              const template = AVAILABLE_TEMPLATES[templateKey];
              const isActive = template.id === templateIndex;
              return (
                <TemplateSlide
                  key={template.id}
                  isActive={isActive}
                  {...template}
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
  id,
  name,
  thumbnail,
  onChangeTemplate,
}: {
  isActive: boolean;
  id: string;
  name: string;
  thumbnail: string;
  onChangeTemplate: (id: string) => void;
}) => {
  return (
    <li className="splide__slide flex justify-center">
      <div
        className={`h-[255px] w-[180px] rounded border hover:cursor-pointer overflow-hidden relative ${
          isActive ? 'border-resume-800' : 'border-resume-200'
        }`}
        onClick={() => {
          onChangeTemplate(id);
        }}
      >
        <Image src={thumbnail} alt={name} layout="fill" />

        {isActive && (
          <div className="absolute top-1 right-1 bg-white rounded-full">
            <Image src={'/icons/selected-tick.svg'} alt="logo" width="24" height="24" />
          </div>
        )}
      </div>
    </li>
  );
};
