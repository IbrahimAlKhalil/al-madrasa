import classes from './index.module.css';
import React from 'react';

function SectionTitle({ title }: { title: string }) {
  return <div className={classes.title}>{title}</div>;
}

export default SectionTitle;
