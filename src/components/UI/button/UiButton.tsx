import React, {FC, PropsWithChildren} from 'react';
import classes from '../UiComps.module.scss'

interface IUiButtonProps extends PropsWithChildren {
  onClick: (e: React.MouseEvent) => void
}

const UiButton: FC<IUiButtonProps> = ({children, onClick}) => {
  return (
    <button onClick={onClick} className={classes.buttonUi}>
      {children}
    </button>
  );
};

export default UiButton;
