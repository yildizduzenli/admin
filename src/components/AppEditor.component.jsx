import React from 'react';
import {Controller} from 'react-hook-form';
import AppFormErrorMessage from './AppFormErrorMessage.component';
import AppLabel from './AppLabel.component';
import rehypeSanitize from 'rehype-sanitize';
import MDEditor from '@uiw/react-md-editor';

const AppEditor = ({label, name, error, rules, control, placeholder}) => {
  return (
    <div className="w-full flex gap-2 flex-col mb-4" data-color-mode="light">
      <AppLabel
        htmlFor={name}
        label={label}
        error={error}
        isRequired={rules?.required}
      />
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field}) => (
          <MDEditor
            {...field}
            height={300}
            textareaProps={{
              placeholder,
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        )}
      />
      <AppFormErrorMessage label={label} error={error} />
    </div>
  );
};

export default AppEditor;
