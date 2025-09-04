import React from 'react';
import {t} from '../locales';

const AppFormErrorMessage = ({error, label, className}) => {
  return (
    <>
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${className}`}>
          {t(`_formErrorMessages.${error.type}`, {label})}
        </p>
      )}
    </>
  );
};

export default AppFormErrorMessage;
