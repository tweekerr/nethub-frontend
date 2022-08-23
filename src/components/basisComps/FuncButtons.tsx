import React, {FC} from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import classes from "./ВasicComps.module.scss"

const FuncButtons: FC = () => {
  return (
    <div className={classes.funcButtons}>
      <button>
        <SvgSelector id={"ExternalLink"}/>
      </button>
      <button>
        <SvgSelector id={"BookmarkBorderOutlined"}/>
      </button>
    </div>
  );
};

export default FuncButtons;
