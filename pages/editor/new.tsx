import {NextPage} from 'next';
import React from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import {MDEditorProps} from '@uiw/react-md-editor';
import {useState, ChangeEvent} from 'react';
import styles from './index.module.scss';
import {Input, Button, message} from 'antd';
import request from 'service/fetch';
import {useRouter} from 'next/router';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {ssr: false});

const NewEditor: NextPage = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const {push} = useRouter();

  const handlePublish = async () => {
    if (!title) {
      message.warn('请输入文章标题');
      return;
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const handleChangeContent = (content: string = '') => {
    setContent(content);
  };

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        {/* 受控组件，输入框是由开发者设置的，而不是组件自身控制实现 */}
        <Input
          className={styles.title}
          type="text"
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Button type="primary" className={styles.button} onClick={handlePublish}>
          发布
        </Button>
      </div>
      <MDEditor value={content} onChange={handleChangeContent} height={1080} />
    </div>
  );
};

(NewEditor as any).layout = null;

export default NewEditor;
