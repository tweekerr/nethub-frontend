import BasicInput from "../basisComps/BasicInput/BasicInput";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.scss"
import BasicTagsInput from "../basisComps/BasicInput/BasicTagsInput";
import {useRef, useState} from "react";

export default function FixedTags(props) {

    const [middleTags, setMiddleTags] = useState("")

    const tagsSlice = () => {
        if (middleTags) {
            props.setValue(middleTags)
            setMiddleTags("")
        }
    }

    const tagsRef = useRef();


    return (
        <div className={classes.fixedTags}>
            {/*<BasicInput {...props} width={"75%"} placeholder={"ex: dotnet"}/>*/}
            <BasicTagsInput width={"180px"} {...props} placeholder={"Теги"} middleTags={middleTags}
                            setMiddleTags={setMiddleTags}/>
            <button onClick={tagsSlice}>
                <SvgSelector id={"AddIcon"}/>
            </button>
            <div ref={tagsRef} className="tagsContainter">

            </div>
        </div>
    );
}       