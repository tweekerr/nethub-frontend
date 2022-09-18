import React, {forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyEditor} from 'tinymce';
import classes from './ArticleCreating.module.sass';
import {api} from "../../../api/api";
import {tinyConfig} from "../../../utils/constants";
import {Action} from "../../../react-app-env";
import CreateArticleForm from "./CreateArticleForm";

interface ITinyInputProps {
  data: string;
  setData: (value: string) => void;
  editorTitle: string;
  error: boolean
}

interface ITinyInputHandle {
  saveImages: (id: string | null) => Promise<void>;
}

const TinyInput: ForwardRefRenderFunction<ITinyInputHandle, ITinyInputProps> =
  ({data, setData, editorTitle, error}, ref) => {
    const editorRef = useRef<TinyEditor | null>(null);

    const saveImageCallback = useCallback(async (id: string | null) => {
      if (editorRef.current) {
        if (!id) id = (await api.createArticles()).id.toString();
        sessionStorage.setItem('articleId', id!);
        await editorRef.current.uploadImages();
        setData(editorRef.current?.getContent());
      }
    }, []);

    useImperativeHandle(ref, () => ({
      async saveImages(id: string | null) {
        await saveImageCallback(id)
      }
    }), [saveImageCallback]);


    const saveImages = async (blobInfo: any) => {
      const id = sessionStorage.getItem('articleId');
      if (!id) return;
      const fd = new FormData();
      fd.append('file', blobInfo.blob());
      const {location} = await api.addImagesToArticle(id, fd);
      sessionStorage.removeItem('articleId');

      return location;
    };

    return (
      <div className={classes.tinyInput}>
        <p>{editorTitle}</p>
        <div className={error ? classes.wrong : ''}>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            value={data}
            onEditorChange={(newValue, _) => {
              setData(newValue);
              // localStorage.setItem('articleBody', data)
            }}
            apiKey={tinyConfig.key}
            init={{
              height: 500,
              menubar: true,
              plugins: tinyConfig.plugins,
              toolbar: tinyConfig.toolbar,
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              images_upload_handler: saveImages,
              automatic_uploads: false,
            }}
          />
        </div>
        {/*<button onClick={saveImageCallback}>Log editor content</button>*/}
      </div>
    );
  };

export default forwardRef(TinyInput);
