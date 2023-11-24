import './app.module.scss'

import { ConfigProvider } from 'antd'
import React from 'react'
import { Routes } from './app.routes'

const App: React.FC = () => (
  <ConfigProvider theme={{}}>
    <Routes />
  </ConfigProvider>
)

export default App
