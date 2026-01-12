import { useEffect } from 'react';
import type { RefObject } from 'react';

type ScrollLockOptions = {
  enabled: boolean;
  mainRef: RefObject<HTMLElement | null>;
};

export default function useScrollLock({ enabled, mainRef }: ScrollLockOptions) {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const headerEl = document.querySelector('.site-header');
    const footerEl = document.querySelector('.site-footer');
    let rafId = 0;

    const updateScrollLock = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
        const footerHeight = footerEl?.getBoundingClientRect().height ?? 0;
        const mainHeight = mainRef.current?.scrollHeight ?? 0;
        const availableHeight = Math.max(window.innerHeight - headerHeight - footerHeight, 0);
        if (mainRef.current) {
          mainRef.current.style.setProperty('--main-available-height', `${availableHeight}px`);
        }
        const fitsViewport = mainHeight <= availableHeight + 2;
        if (enabled && fitsViewport) {
          body.style.overflowY = 'hidden';
          html.style.overflowY = 'hidden';
        } else {
          body.style.overflowY = '';
          html.style.overflowY = '';
        }
      });
    };

    updateScrollLock();

    const resizeObserver = new ResizeObserver(updateScrollLock);
    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }
    if (headerEl) {
      resizeObserver.observe(headerEl);
    }
    if (footerEl) {
      resizeObserver.observe(footerEl);
    }

    window.addEventListener('resize', updateScrollLock);
    return () => {
      window.removeEventListener('resize', updateScrollLock);
      resizeObserver.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      body.style.overflowY = '';
      html.style.overflowY = '';
    };
  }, [enabled, mainRef]);
}
