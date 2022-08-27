import React, {useCallback, useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import classes from './ArticleCreating.module.scss';
import {api} from "../../api/api";
import {tinyConfig} from "../../utils/constants";

interface ITinyInputProps {
  data: string;
  setData: (value: string) => void;
  editorTitle: string;
}

const TinyInput: React.FC<ITinyInputProps> = ({data, setData, editorTitle}) => {
  const editorRef = useRef<Editor>(null);

  const log = useCallback(async () => {
    if (editorRef.current) {
      const {id} = await api.createArticles();
      sessionStorage.setItem('articleId', id);
      await editorRef.current
        .editor
        ?.uploadImages()
        .then(() => console.log(editorRef.current?.editor?.getContent()));
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
      <Editor
        ref={editorRef}
        // onInit={(event, editor) => editorRef.current = editor}
        initialValue={data}
        onEditorChange={(newValue, editor) => {
          setData(newValue);
        }}
        // onInit={(evt, editor) => (editorRef.current?.editor ?? editor)}
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
      <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default TinyInput;
