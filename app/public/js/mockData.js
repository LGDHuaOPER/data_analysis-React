import myUtil from './myUtil';

const groupItemKey = myUtil.Collection.groupItemKey;

let tableData = [
  {
    key: '0',
    firstName: 'John',
    lastName: 'Brown',
    age: 33,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '1',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '2',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    firstName: 'Joee',
    lastName: 'Blacck',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool']
  },
  {
    key: '4',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '5',
    firstName: 'John',
    lastName: 'Brown',
    age: 55,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '6',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '7',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '8',
    firstName: 'Joee',
    lastName: 'Blacck',
    age: 77,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool']
  },
  {
    key: '9',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '10',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '11',
    firstName: 'Jooe11',
    lastName: 'Bloack',
    age: 32,
    address: 'Sidney No. 12 Lake Park',
    tags: ['teacher']
  },
  {
    key: '12',
    firstName: 'Joe12',
    lastName: 'Bla1ack',
    age: 55,
    address: 'Sidn3ey No. 11 Lake Park',
    tags: ['teacher', 'mother']
  },
  {
    key: '13',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '14',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '16',
    firstName: 'Joee',
    lastName: 'Blacck',
    age: 77,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool']
  },
  {
    key: '19',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '20',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '21',
    firstName: 'Jooe11',
    lastName: 'Bloack',
    age: 32,
    address: 'Sidney No. 12 Lake Park',
    tags: ['teacher']
  },
  {
    key: '25',
    firstName: 'Joe12',
    lastName: 'Bla1ack',
    age: 55,
    address: 'Sidn3ey No. 11 Lake Park',
    tags: ['teacher', 'mother']
  },
  {
    key: '35',
    firstName: 'Joe12',
    lastName: 'Bla1ack',
    age: 55,
    address: 'Sidn3ey No. 11 Lake Park',
    tags: ['teacher', 'mother']
  },
  {
    key: '39',
    firstName: 'Hua',
    lastName: 'Ying',
    age: 100,
    address: 'HuaYIng No. 1314 Lake Park',
    tags: ['father', 'mother']
  }
];

let recycleTableData = [
  {
    key: '0',
    firstName: 'John',
    lastName: 'Brown',
    age: 33,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '1',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '2',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '3',
    firstName: 'Joee',
    lastName: 'Blacck',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool']
  },
  {
    key: '4',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '5',
    firstName: 'John',
    lastName: 'Brown',
    age: 55,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '6',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '7',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '8',
    firstName: 'Joee',
    lastName: 'Blacck',
    age: 77,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool']
  },
  {
    key: '9',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '10',
    firstName: 'Jooe',
    lastName: 'Blaack',
    age: 32,
    address: 'Sidney No. 2 Lake Park',
    tags: ['teacher']
  },
  {
    key: '11',
    firstName: 'Jooe11',
    lastName: 'Bloack',
    age: 32,
    address: 'Sidney No. 12 Lake Park',
    tags: ['teacher']
  },
  {
    key: '12',
    firstName: 'Joe12',
    lastName: 'Bla1ack',
    age: 55,
    address: 'Sidn3ey No. 11 Lake Park',
    tags: ['teacher', 'mother']
  }
];

export default {
  tableData: tableData,
  allKeys: groupItemKey(tableData, ['key']).key,
  recycleTableData: recycleTableData,
  recycleAllKeys: groupItemKey(recycleTableData, ['key']).key
};
