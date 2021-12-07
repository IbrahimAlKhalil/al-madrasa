import { PageProps } from 't/page-props';
import { createContext } from 'react';

export const PageContext = createContext<PageProps | null>(null);
