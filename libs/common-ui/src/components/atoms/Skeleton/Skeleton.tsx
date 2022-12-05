import React from 'react';
import { Skeleton as SkeletonBase, SkeletonProps } from 'antd';
import { AvatarProps } from 'antd/lib/skeleton/Avatar';
import { SkeletonButtonProps } from 'antd/lib/skeleton/Button';
import { SkeletonImageProps } from 'antd/lib/skeleton/Image';
import { SkeletonInputProps } from 'antd/lib/skeleton/Input';

export const Skeleton = {
  Base: (props: SkeletonProps) => (
    <SkeletonBase data-cy="loader" active {...props} />
  ),
  Button: (props: SkeletonButtonProps) => (
    <SkeletonBase.Button data-cy="loader" active {...props} />
  ),
  Avatar: (props: AvatarProps) => (
    <SkeletonBase.Avatar data-cy="loader" active {...props} />
  ),
  Input: (props: SkeletonInputProps) => (
    <SkeletonBase.Input data-cy="loader" active {...props} />
  ),
  Image: (props: SkeletonImageProps) => (
    <SkeletonBase.Image data-cy="loader" {...props} />
  ),
};
