import { PageProps } from '../types/page-props';
import { createContext } from 'react';

export const PageContext = createContext<PageProps | null>(null);
