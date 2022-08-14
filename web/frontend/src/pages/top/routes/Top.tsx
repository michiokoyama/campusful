import React from 'react';
// import { Header } from '../../../components/common/Header';
import { SidebarWithHeader } from '../../../components/common/SideBar';
import { SearchBox } from '../../../components/common/SearchBox';

export const Top = () => {
  const headerProps = {
    title: 'campusful',
    color: 'green',
  }
  return (
    <SidebarWithHeader>
      <MainContents />
    </SidebarWithHeader>
    );
}

const MainContents = () => {
    return (<SearchBox />)
}