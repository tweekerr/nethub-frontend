import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import classes from './ArticleCreating.module.scss';
import { useSelector } from 'react-redux';

const TinyInput = ({ value, setValue, tinyTitle }) => {
  useEffect(() => setValue(value ?? ''), [value]);
  const editorRef = useRef(null);

  // const plugArticleStore = useSelector(state => state.plugArticleReducer)
  const log = async () => {
    //TODO: перед викликом uploadImages треба створити статтю і передати? в uploadImages айді статті
    if (editorRef.current) {
      await editorRef.current
        .uploadImages()
        .then((e) => console.log(editorRef.current.getContent()));
    }
  };

  return (
    <div className={classes.tinyInput}>
      <p>{tinyTitle}</p>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={'ssa5k3d1x7l2e9g73u0dg6hfah65pzgh4iqkd9ulzslfywn1'}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'pagebreak',
            'searchreplace',
            'wordcount',
            'visualblocks',
            'visualchars',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'nonbreaking',
            'save',
            'table',
            'directionality',
            'emoticons',
            'template',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_handler: async (blobInfo) => {
            //TODO: замінити на дійсну урлу, перед аплоадом потрібно зробити запит на створення статті, після цього викликати функцію log
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(
                  'https://krot.info/uploads/posts/2022-03/1646719474_15-krot-info-p-memi-s-gorillami-smeshnie-foto-15.jpg'
                );
              }, 2000);
            });
          },
          automatic_uploads: false,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default TinyInput;
