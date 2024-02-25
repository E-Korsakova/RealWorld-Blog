import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler, useFieldArray } from 'react-hook-form';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

// import { createNewArticle } from '../../store/fetchSlice';
import { /*useAppDispatch,*/ useAppSelector } from '../../hooks';

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
  const { isError, article } = useAppSelector((state) => state.fetch);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormType>({
    defaultValues: {
      tags: article ? article.tagList.map((tag) => ({ name: tag })) : [],
    },
  });
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { append, fields, remove } = useFieldArray({ control, name: 'tags' });

  const submit: SubmitHandler<ArticleFormType> = (data) => {
    // const user = {
    //   title: data.title,
    //   description: data.description,
    //   body: data.text,
    //   tagList: data.tags.map((tag) => tag.name),
    // };
    // dispatch(createNewArticle(user));
    console.log(data);
    navigate('/');
  };

  const error: SubmitErrorHandler<ArticleFormType> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.ArticleForm}>
      <header className={styles.header}>{isEdit ? 'Edit article' : 'Create new article'}</header>
      <form onSubmit={handleSubmit(submit, error)}>
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
                value={article ? article.title : ''}
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
                value={article ? article.description : ''}
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
                value={article ? article.body : ''}
              />
              {errors.text && <span className={styles.error}>{errors.text.message}</span>}
            </>
          )}
        />
        <label htmlFor="tags" className={styles.label} style={{ display: 'block', marginBottom: 3 }}>
          Tags
        </label>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={index} className={styles.tag}>
                <Controller
                  name={`tags.${index}.name`}
                  control={control}
                  rules={{
                    required: { value: true, message: 'This field is required' },
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        style={
                          errors.tags
                            ? { ...InputStyle, borderColor: 'red', marginBottom: 0, width: 300 }
                            : { ...InputStyle, width: 300 }
                        }
                        placeholder="Tags"
                      />
                      {errors.tags && <span className={styles.error}>{errors.tags.message}</span>}
                    </>
                  )}
                />
                {/* <input type="text" placeholder="Tag" {...register(`tags.${index}.name`)} /> */}
                <button aria-label="delete tag" className={styles.deleteButton} onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            );
          })}
          <button aria-label="add tag" className={styles.addTagButton} onClick={() => append({ name: '' })}>
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
