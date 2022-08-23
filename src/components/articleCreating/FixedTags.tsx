import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.scss"
import BasicTagsInput from "../basisComps/BasicInput/BasicTagsInput";
import {FC, useState} from "react";

interface IFixedTagsProps {
  tag: string,
  setTag: (tag: string) => void
}

const FixedTags: FC<IFixedTagsProps> = ({tag, setTag}) => {

  const [middleTags, setMiddleTags] = useState("")

  const tagsSlice = () => {
    if (middleTags) {
      setTag(middleTags)
      setMiddleTags("dasdasd123123")
    }
  }

  return (
    <div className={classes.fixedTags}>
      {/*<BasicInput {...props} width={"75%"} placeholder={"ex: dotnet"}/>*/}
      <BasicTagsInput width={"180px"} placeholder={"Теги"} middleTags={middleTags}
                      setMiddleTags={setMiddleTags}/>
      <button onClick={tagsSlice}>
        <SvgSelector id={"AddIcon"}/>
      </button>
    </div>
  );
}

export default FixedTags;
