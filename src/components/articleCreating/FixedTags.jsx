import BasicInput from "../basisComps/BasicInput/BasicInput";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.scss"
import BasicTagsInput from "../basisComps/BasicInput/BasicTagsInput";
import {useState} from "react";

export default function FixedTags(props) {

    const [middleTags, setMiddleTags] = useState("")


    let tagsSlice = ()=>{
        if (middleTags){
            props.setValue(middleTags)
        }
    }


    return (
        <div className={classes.fixedTags}>
            {/*<BasicInput {...props} width={"75%"} placeholder={"ex: dotnet"}/>*/}
            <BasicTagsInput width={"150px"} {...props} middleTags={middleTags} setMiddleTags={setMiddleTags}/>
            <button onClick={tagsSlice}>
                <SvgSelector id={"AddIcon"}/>
            </button>
        </div>
    );
}       