import React, { useContext } from 'react';
import { Table } from 'antd';
import UploadedImages from '../contexts/UploadedImages'

const ResultsTable = () =>{
  const uploaded = useContext(UploadedImages)
  const { images, setUploadedImages } = uploaded

  const columns = [
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      createdAt: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      createdAt: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Joe Black',
      age: 32,
      createdAt: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];
  return (
    <Table
    columns={columns}
    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
    dataSource={images}
    pagination={false}
  />
  )
}
export default ResultsTable
