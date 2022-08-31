import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { Global } from '@emotion/react';

// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { useTemplates } from 'src/stores/useTemplate';

export const TemplateSlider = () => {
  const templateIndex = useTemplates((state) => state.index);

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

  const onChangeTemplate = (templateId: number) => {
    useTemplates.getState().setTemplate(templateId);
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
            {AVAILABLE_TEMPLATES.map((template, index) => {
              const isActive = index === templateIndex;
              return (
                <TemplateSlide
                  key={index}
                  id={index}
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
  id: number;
  name: string;
  thumbnail: string;
  onChangeTemplate: (id: number) => void;
}) => {
  return (
    <li
      className="splide__slide hover:cursor-pointer"
      onClick={() => {
        onChangeTemplate(id);
      }}
    >
      <div
        className={`h-[255px] w-[179px] rounded border relative ${
          isActive ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
        }`}
      >
        <Image src={thumbnail} alt={name} layout="fill" />

        {isActive && (
          <div className="absolute top-3 right-3">
            <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
          </div>
        )}
      </div>
    </li>
  );
};
