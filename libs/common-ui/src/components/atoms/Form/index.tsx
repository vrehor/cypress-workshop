import React, { useCallback } from 'react';
import { Form as AntdForm } from 'antd';

export const Form: typeof AntdForm = ({ onFinish, ...formProps }) => {
  const onFinishWrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      return onFinish?.(value); // here we can do something as trim value
    },
    [onFinish]
  );
  return <AntdForm onFinish={onFinishWrapper} {...formProps} />;
};

Form.useForm = AntdForm.useForm;
Form.useFormInstance = AntdForm.useFormInstance;
Form.useWatch = AntdForm.useWatch;
Form.List = AntdForm.List;
Form.ErrorList = AntdForm.ErrorList;
Form.Item = AntdForm.Item;
Form.Provider = AntdForm.Provider;
Form.create = AntdForm.create;
