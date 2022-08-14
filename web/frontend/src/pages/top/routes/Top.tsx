import React from 'react';
import { Header } from '../../../components/common/Header';

export const Top = () => {
  const headerProps = {
    title: 'campusful',
    color: 'green',
  }
  return (
    <Header {...headerProps}>
      test
    </Header>);
}
