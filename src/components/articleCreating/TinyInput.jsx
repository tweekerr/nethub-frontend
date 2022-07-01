import React, {useEffect} from 'react';
import {Editor} from "@tinymce/tinymce-react"
import classes from './ArticleCreating.module.scss'
import {useSelector} from "react-redux";

const TinyInput = ({value,setValue, tinyTitle}) => {

    useEffect(() => setValue(value ?? ''), [value]);

    const plugArticleStore = useSelector(state => state.plugArticleReducer)

    console.log(plugArticleStore)


    return (
        <div className={classes.tinyInput}>
            <p>{tinyTitle}</p>
            <Editor
                apiKey={"ssa5k3d1x7l2e9g73u0dg6hfah65pzgh4iqkd9ulzslfywn1"}
                value={value}
                onEditorChange={(value, editor) => setValue(value)}
            />
        </div>
    );
};


export default TinyInput;
