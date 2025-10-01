// src/global.d.ts
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gen-search-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        configid?: string;
        location?: string;
        triggerid?: string;
        anchorstarget?: '_blank' | '_self' | '_parent' | '_top';
        placeholder?: string;
        alwaysopened?: boolean;
      };
    }
  }
}
export {};
