import { useRef } from 'react';

const safeDocument: Document = document;

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
const useScrollBlock: () => [() => void, () => void] = () => {
  const scrollBlocked = useRef(false);
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const handleWheel = () => {
    // do nothing
  };

  const blockScroll = (): void => {
    if (!body?.style || scrollBlocked.current) {
      return;
    }
    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = 'relative'; /* [1] */
    html.style.overflow = 'hidden'; /* [2] */
    body.style.position = 'relative'; /* [1] */
    body.style.overflow = 'hidden'; /* [2] */
    body.classList.add("no-sroll");
    body.addEventListener('wheel', handleWheel, { passive: false }); // chrome special

    scrollBlocked.current = true;
  };

  const allowScroll = (): void => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
    body.removeEventListener('wheel', handleWheel); // chrome special

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
