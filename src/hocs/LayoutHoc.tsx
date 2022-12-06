import React, {FC, PropsWithChildren} from 'react';
import AuthorizedHoc from "./AuthorizedHoc";


interface ILayoutHocProps extends PropsWithChildren {
  children: JSX.Element,
  authorized: boolean
}

const LayoutHoc: FC<ILayoutHocProps> = ({children, authorized}): JSX.Element => {
  return authorized ? <AuthorizedHoc>
      {children}
    </AuthorizedHoc>
    : children
};

export default LayoutHoc;