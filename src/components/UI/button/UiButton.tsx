import React, {FC, PropsWithChildren} from 'react';
import classes from '../UiComps.module.sass'

interface IUiButtonProps extends PropsWithChildren {
  onClick: (e: React.MouseEvent) => void,
  padding?: string,
  backgroundColor?: string
  color?: string
  boldSize?: number
  width?: string
  fontSize?: string
}

const UiButton: FC<IUiButtonProps> = ({
                                        children,
                                        onClick,
                                        padding,
                                        backgroundColor,
                                        color,
                                        boldSize,
                                        width,
                                        fontSize
                                      }) => {
  return (
    <button
      style={{
        padding: padding ?? '5px 15px',
        backgroundColor: backgroundColor ?? '#896DC8',
        color: color ?? '#FFFFFF',
        fontWeight: boldSize ?? 700,
        width: width ?? 'fit-content',
        fontSize: fontSize ?? '16px'
      }}
      onClick={onClick} className={classes.buttonUi}>
      {children}
    </button>
  );
};

export default UiButton;
