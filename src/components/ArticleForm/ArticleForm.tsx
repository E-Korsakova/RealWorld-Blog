import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm, Controller, useFieldArray } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import { createNewArticle, editArticle } from '../../store/fetchSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './index.module.scss';

const InputStyle: React.CSSProperties = {
  height: 40,
  marginBottom: 20,
};

interface ArticleFormProps {
  isEdit: boolean;
}

interface ArticleFormType {
  title: string;
  description: string;
  text: string;
  tags: {
    name: string;
  }[];
}

export const ArticleForm = ({ isEdit }: ArticleFormProps): ReactElement => {
  const { TextArea } = Input;
  const { isError, article, loading } = useAppSelector((state) => state.fetch);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ArticleFormType>({
    defaultValues: {
      title: article && isEdit ? article.title : '',
      description: article && isEdit ? article.description : '',
      text: article && isEdit ? article.body : '',
      tags: article && isEdit ? article.tagList.map((tag) => ({ name: tag })) : [],
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { append, fields, remove } = useFieldArray({ control, name: 'tags' });

  const submit: SubmitHandler<ArticleFormType> = (data) => {
    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags.map((tag) => tag.name),
    };
    if (isEdit && article) dispatch(editArticle({ newArticle, slug: article.slug }));
    else dispatch(createNewArticle(newArticle));
  };

  useEffect(() => {
    if (isSubmitSuccessful && article && !loading) {
      navigate(`/articles/${article.slug}`);
    }
  }, [isSubmitSuccessful, article]);

  return (
    <div className={styles.ArticleForm}>
      <header className={styles.header}>{isEdit ? 'Edit article' : 'Create new article'}</header>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            minLength: { value: 3, message: 'Title needs to be at least 3 characters' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.title ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Title"
              />
              {errors.title && <span className={styles.error}>{errors.title.message}</span>}
            </>
          )}
        />

        <label htmlFor="description" className={styles.label}>
          Short description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                style={errors.description ? { ...InputStyle, borderColor: 'red', marginBottom: 0 } : InputStyle}
                placeholder="Description"
              />
              {errors.description && <span className={styles.error}>{errors.description.message}</span>}
            </>
          )}
        />
        <label htmlFor="text" className={styles.label}>
          Text
        </label>
        <Controller
          name="text"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field }) => (
            <>
              <TextArea
                {...field}
                placeholder="Text"
                style={
                  errors.text
                    ? { ...InputStyle, borderColor: 'red', marginBottom: 0, height: 170, resize: 'none' }
                    : { ...InputStyle, height: 170, resize: 'none' }
                }
              />
              {errors.text && <span className={styles.error}>{errors.text.message}</span>}
            </>
          )}
        />
        <label htmlFor="tags" className={styles.label} style={{ display: 'block', marginBottom: 3 }}>
          Tags
        </label>
        <ul className={styles.tagList}>
          {fields.map((_, index) => {
            return (
              <li key={uniqid.time('tag-')} className={styles.tag}>
                <Controller
                  name={`tags.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} style={{ ...InputStyle, width: 300, marginBottom: 5 }} placeholder="Tags" />
                      {errors.tags && <span className={styles.error}>{errors.tags.message}</span>}
                    </>
                  )}
                />
                <button
                  type="button"
                  aria-label="delete tag"
                  className={styles.deleteButton}
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </li>
            );
          })}
          <button
            type="button"
            aria-label="add tag"
            className={styles.addTagButton}
            onClick={() => append({ name: '' })}
          >
            Add tag
          </button>
        </ul>
        <button type="submit" className={styles.button}>
          Send
        </button>
        {typeof isError === 'string' && <span className={styles.error}>{isError}</span>}
      </form>
    </div>
  );
};
