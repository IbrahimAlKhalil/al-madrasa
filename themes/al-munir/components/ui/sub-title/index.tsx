import classes from './index.module.css';
import React from 'react';

function SubTitle({ title }: { title: string }) {
  return <h4 className={classes.subTitle}>{title}</h4>;
}

export default SubTitle;
