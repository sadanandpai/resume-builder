import '@splidejs/splide/css';

import Splide, { Splide as SplideCore } from '@splidejs/splide';
import { useEffect, useRef } from 'react';

import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { Global } from '@emotion/react';
import Image from 'next/image';
import { useTemplates } from '@/stores/useTemplate';

const TILE_W = 170;
const TILE_H = 240;

/** Used until each template has its own PNG under `public/templates/` */
const THUMBNAIL_PLACEHOLDER = '/icons/resume-icon.svg';

export const TemplateSlider = () => {
  const templateIndex = useTemplates((state) => state.activeTemplate.id);

  const targetElementRef = useRef<HTMLElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      splideInstanceRef.current = new SplideCore(targetElement, {
        perPage: 3,
        pagination: false,
        gap: '12px',
        width: '100%',
        autoHeight: true,
        perMove: 1,
        breakpoints: {
          900: { perPage: 3 },
          640: { perPage: 2 },
          480: { perPage: 1 },
        },
      });

      splideInstanceRef.current.mount();
    }

    return () => {
      splideInstanceRef.current?.destroy();
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
      <section className="splide mt-[22px] mb-[36px] md:px-[36px]" ref={targetElementRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {Object.keys(AVAILABLE_TEMPLATES).map((templateKey) => {
              const template = AVAILABLE_TEMPLATES[templateKey];
              const isActive = template.id === templateIndex;
              return (
                <TemplateSlide
                  key={template.id}
                  isActive={isActive}
                  id={template.id}
                  name={template.name}
                  thumbnail={template.thumbnail}
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
  const src = thumbnail || THUMBNAIL_PLACEHOLDER;
  const isPlaceholder = !thumbnail;

  return (
    <li className="splide__slide flex flex-col items-center">
      <div
        className={`rounded border hover:cursor-pointer overflow-hidden relative transition-shadow hover:shadow-lg ${
          isActive ? 'border-resume-800 ring-2 ring-resume-800' : 'border-resume-200'
        } ${isPlaceholder ? 'bg-resume-50' : 'bg-white'}`}
        style={{ width: TILE_W, height: TILE_H }}
        onClick={() => {
          onChangeTemplate(id);
        }}
      >
        <Image
          src={src}
          alt={name}
          fill
          className={isPlaceholder ? 'object-contain p-8' : 'object-cover'}
          sizes={`${TILE_W}px`}
          unoptimized={isPlaceholder}
        />

        {isActive && (
          <div className="absolute top-1 right-1 bg-white rounded-full">
            <Image src={'/icons/selected-tick.svg'} alt="logo" width="24" height="24" />
          </div>
        )}
      </div>
      <div
        className={`mt-2 text-xs text-center px-1 leading-tight ${
          isActive ? 'text-resume-800 font-semibold' : 'text-resume-600'
        }`}
        style={{ width: TILE_W }}
      >
        {name}
      </div>
    </li>
  );
};
