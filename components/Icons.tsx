import type { SVGProps } from 'react';

export type IconId =
  | 'arrow' | 'phone' | 'mail' | 'pin' | 'home' | 'wave' | 'drop' | 'cube' | 'star'
  | 'quote' | 'check' | 'close' | 'left' | 'right' | 'expand';

/** Renders one symbol from the sprite below. */
export function Icon({ id, ...rest }: { id: IconId } & SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" {...rest}>
      <use href={`#i-${id}`} />
    </svg>
  );
}

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7.4v1.9L12 14l7.6-4.7V7.4z" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" /></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.6 1.6 11.4l1.3 1.5L4.5 11.6V21h5.6v-6h3.8v6h5.6v-9.4l1.6 1.3 1.3-1.5z" /></symbol>
      <symbol id="i-wave" viewBox="0 0 24 24"><path d="M2.5 15.5 7 11l5 4.5 5-4.5 4.5 4.5M2.5 10 7 5.5l5 4.5 5-4.5L21.5 10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-drop" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5s6.8 7.3 6.8 12.2a6.8 6.8 0 0 1-13.6 0C5.2 9.8 12 2.5 12 2.5z" /></symbol>
      <symbol id="i-cube" viewBox="0 0 24 24"><path d="M21 16.5v-9L12 2.5l-9 5v9l9 5zM3.3 7.4 12 12.3l8.7-4.9M12 21.5v-9.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" /></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" d="m12 1.8 3.1 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.6l-6.4 3.6 1.5-7.1-5.4-4.9 7.2-.8z" /></symbol>
      <symbol id="i-quote" viewBox="0 0 48 40"><path transform="rotate(180 24 20)" fill="currentColor" d="M2 40V24.5C2 11 8.5 3.6 21 1.5l1.8 5.6C16 9 13 12.8 12.7 18.5H21V40zm25 0V24.5C27 11 33.5 3.6 46 1.5l1.8 5.6C41 9 38 12.8 37.7 18.5H46V40z" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="M15 5.5 8.5 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M9 5.5 15.5 12 9 18.5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-expand" viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
    </svg>
  );
}
