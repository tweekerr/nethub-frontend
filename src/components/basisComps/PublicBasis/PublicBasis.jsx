import React from 'react';
import classes from './PublicBasis.module.css';
import { StyledLink } from './styled';

const PublicBasis = ({ title, description, timeAgo }) => {
  return (
    <StyledLink href='#'>
      <div className={classes.titleTime}>
        <h2 className={classes.publicTitle}>{title}</h2>
        <p className={classes.timeAgo}>{timeAgo}</p>
      </div>
      <p className={classes.publicDes}>{description}</p>
    </StyledLink>
  );
};

export default PublicBasis;