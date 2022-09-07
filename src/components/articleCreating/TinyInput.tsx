import React, {useCallback, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Editor as TinyEditor} from 'tinymce';
import classes from './ArticleCreating.module.sass';
import {api} from "../../api/api";
import {tinyConfig} from "../../utils/constants";

interface ITinyInputProps {
  data: string;
  setData: (value: string) => void;
  editorTitle: string;
  error: boolean
}

const TinyInput: React.FC<ITinyInputProps> = ({data, setData, editorTitle, error}) => {
  const editorRef = useRef<TinyEditor | null>(null);

  const log = useCallback(async () => {
    if (editorRef.current) {
      const {id} = await api.createArticles();
      sessionStorage.setItem('articleId', id);
      await editorRef.current
        .uploadImages()
        .then(() => console.log(editorRef.current?.getContent()));
    }
  }, []);

  const saveImages = async (blobInfo: any) => {
    const id = sessionStorage.getItem('articleId');
    //TODO: check if no id
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
          onEditorChange={(newValue, editor) => {
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

      <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default TinyInput;
