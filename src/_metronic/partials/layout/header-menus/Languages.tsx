/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import React, { FC } from "react";
import { toAbsoluteUrl } from "../../../helpers";
import { useLang, setLanguage } from "../../../i18n/Metronici18n";
import { Lang } from "../../../../_custom/i18n/I18nMessages";
import { Trans } from "../../../../_custom/components/Trans";

export const languages: Array<{
  lang: Lang;
  name: string;
  flag: string;
  upcoming?: boolean;
}> = [
  {
    lang: "en",
    name: "English",
    flag: toAbsoluteUrl("/media/flags/united-states.svg"),
    upcoming: true,
  },
  {
    lang: "ar",
    name: "العربية",
    flag: toAbsoluteUrl("/media/flags/morocco.svg"),
    upcoming: true,
  },
  {
    lang: "fr",
    name: "Français",
    flag: toAbsoluteUrl("/media/flags/france.svg"),
  },
];

const Languages: FC = () => {
  const lang = useLang();
  const currentLanguage = languages.find((l) => l.lang === lang);

  return (
    <>
      {languages.map(({ lang, flag, name, upcoming }) => (
        <div
          key={lang}
          onClick={() => {
            if (!upcoming && currentLanguage && lang !== currentLanguage.lang) {
              setLanguage(lang);
            }
          }}
          className='menu-item px-5'
        >
          <a
            href='#'
            className={clsx("menu-link d-flex px-5", {
              active: lang === currentLanguage?.lang,
            })}
            onClick={(e) => e.preventDefault()}
          >
            <span className='menu-text'>
              <span className='symbol symbol-20px me-4'>
                <img
                  className='rounded-1'
                  src={flag}
                  alt='gmao'
                />
              </span>
              {name}
              {upcoming && (
                <span className='badge badge-light-info ms-2'>
                  <Trans id='UPCOMING' />
                </span>
              )}
            </span>
          </a>
        </div>
      ))}
    </>
  );

  // return (
  //   <div
  //     className='menu-item px-5 '
  //     data-kt-menu-trigger='hover'
  //     data-kt-menu-placement='left-start'
  //     data-kt-menu-flip='bottom'
  //   >
  //     <a href='#' className='menu-link px-5'>
  //       <span className='menu-title position-relative'>
  //         Language
  //         <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
  //           {currentLanguage?.name}{' '}
  //           <img
  //             className='w-15px h-15px rounded-1 ms-2'
  //             src={currentLanguage?.flag}
  //             alt='gmao'
  //           />
  //         </span>
  //       </span>
  //     </a>
  //
  //     <div className='menu-sub menu-sub-dropdown w-175px py-4'>
  //       {languages.map((l) => (
  //         <div
  //           className='menu-item px-3'
  //           key={lang}
  //           onClick={() => {
  //             if (!upcoming) {
  //               setLanguage(lang)
  //             }
  //           }}
  //         >
  //           <a
  //             href='#'
  //             className={clsx('menu-link d-flex px-5', {active: lang === currentLanguage?.lang})}
  //           >
  //             <span className='symbol symbol-20px me-4'>
  //               <img className='rounded-1' src={flag} alt='gmao' />
  //             </span>
  //             {name}
  //             {upcoming && (
  //               <span className='badge badge-light-info ms-2'>
  //                 Soon
  //               </span>
  //             )}
  //           </a>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
};

export { Languages };
