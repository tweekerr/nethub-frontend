import React, {forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyEditor} from 'tinymce';
import classes from './ArticleCreating.module.sass';
import {articlesApi} from "../../../api/api";
import {tinyConfig} from "../../../utils/constants";

interface ITinyInputProps {
  data: string;
  setData: (value: string) => void;
  editorTitle: string;
  isInvalid: boolean
}

interface ITinyInputHandle {
  saveImages: (id: string | null) => Promise<string>;
}

const TinyInput: ForwardRefRenderFunction<ITinyInputHandle, ITinyInputProps> =
  ({data, setData, editorTitle, isInvalid}, ref) => {
    const editorRef = useRef<TinyEditor | null>(null);

    const saveImageCallback = useCallback(async (id: string | null) => {
      if (!id) id = (await articlesApi.createArticle()).id.toString();
      sessionStorage.setItem('articleId', id!);
      await editorRef.current!.uploadImages();

      const newData = editorRef.current!.getContent();
      setData(newData);

      return id;
    }, []);

    useImperativeHandle(ref, () => ({
      async saveImages(id: string | null) {
        return await saveImageCallback(id)
      }
    }), [saveImageCallback]);


    const saveImages = async (blobInfo: any) => {
      const id = sessionStorage.getItem('articleId');
      if (!id) return;
      const fd = new FormData();
      fd.append('file', blobInfo.blob());
      const {location} = await articlesApi.addImagesToArticle(id, fd);
      sessionStorage.removeItem('articleId');

      return location;
    };

    return (
      <div className={classes.tinyInput}>
        <p>{editorTitle}</p>
        <div className={isInvalid ? classes.wrong : ''}>
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
