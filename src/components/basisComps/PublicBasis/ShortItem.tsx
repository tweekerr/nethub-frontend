import React, {FC} from 'react';
import classes from './PublicBasis.module.scss';
import {StyledLink} from './styled';

interface IShortItemProps {
  title: string,
  description: string,
  timeAgo?: string
}

const ShortItem: FC<IShortItemProps> = ({title, description, timeAgo}) => {
  return (
    <StyledLink href='#'>
      <div className={classes.titleTime}>
        <h2 className={classes.publicTitle}>{title}</h2>
        {
          timeAgo &&
          <p className={classes.timeAgo}>{timeAgo}</p>
        }
      </div>
      <p className={classes.publicDes}>{description}</p>
    </StyledLink>
  );
};

export default ShortItem;
