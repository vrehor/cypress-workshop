import { LoadingOutlined } from '@ant-design/icons';

import * as S from './Loader.styles';

export const Loader = () => {
  return (
    <S.Wrapper>
      <S.Spin size="large" indicator={<LoadingOutlined />} />
    </S.Wrapper>
  );
};
