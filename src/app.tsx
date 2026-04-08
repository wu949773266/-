import { PropsWithChildren } from 'react';
import '@/app.css';
import { Preset } from './presets';

const App = ({ children }: PropsWithChildren) => {
  return <Preset>{children}</Preset>;
};

// 全局分享配置
App.onShareAppMessage = () => {
  return {
    title: '山渡户外',
    path: '/pages/index/index'
  };
};

App.onShareTimeline = () => {
  return {
    title: '山渡户外',
    query: '',
    imageUrl: ''
  };
};

export default App;
