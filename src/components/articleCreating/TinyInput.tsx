import React, { useCallback, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
//@ts-ignore
import classes from './ArticleCreating.module.scss';
import { api } from 'api';
import { tinyConfig } from 'utils/constants';

interface IProps {
  value: string;
  setValue: (value: string) => void;
  tinyTitle: string;
}

const TinyInput: React.FC<IProps> = ({ value, setValue, tinyTitle }) => {
  const editorRef = useRef<any>(null);

  const log = useCallback(async () => {
    if (editorRef.current) {
      const { id } = await api.createArticles();
      sessionStorage.setItem('articleId', id);
      await editorRef.current
        .uploadImages()
        .then(() => console.log(editorRef.current.getContent()));
    }
  }, []);

  const saveImages = async (blobInfo: any) => {
    const id = sessionStorage.getItem('articleId');
    //TODO: check if no id
    if (!id) return;
    const fd = new FormData();
    fd.append('file', blobInfo.blob());
    const { location } = await api.addImgaesToArticle(id, fd);
    sessionStorage.removeItem('articleId');
    return location;
  };

  return (
    <div className={classes.tinyInput}>
      <p>{tinyTitle}</p>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
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
