import raxios from './utils/axios_helper.js';
import { Card, ConfigProvider, message, Table, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import SignIn from './signin/index.js';

const App = () => {
  const appVersion = '0.0.1';
  const [data, setData] = useState([]);

  const darkMode = useState(() => {
    const localStorageDarkMode = localStorage.getItem('darkMode');
    if (localStorageDarkMode !== null) {
      return JSON.parse(localStorageDarkMode);
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  useEffect(() => {
    // fetchInstalledApps(setApps);
    fetchBoard();
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== appVersion) {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('appVersion', appVersion);
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
      document.body.classList.add('dark');
    } else {
      localStorage.setItem('darkMode', 'false');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchBoard = async () => {
    try {
      const response = await raxios.get('/board');
      if (response.status === 200) {
        setData(response.data.data.output.data);
      } else {
        message.error('Failed to fetch leaderboard');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      message.error('An error occurred. Please try again later.');
    }
  }

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'guesses',
      key: 'serial',
      render: (text, record, index) => `#${index + 1}`,
      sorter: (a, b) => a.guesses - b.guesses,
      defaultSortOrder: 'ascend',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'user_name',
      key: 'name',
    }
  ]

  return (
    <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <div className='min-w-screen min-h-screen overflow-clip dark:bg-darkBlack dark:text-white flex w-full'>
        {data.length !== 0 && <Card
          title="Leaderboard"
          className='m-5 mr-0 w-2/4 max-h-[90vh] overflow-clip'
        >
          <Table
            className='max-h-screen overflow-y-scroll'
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </Card>}
        <SignIn />
      </div>
    </ConfigProvider>
  );
}

export default App;
