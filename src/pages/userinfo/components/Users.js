import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/userinfo/components/Users',
      query: { page },
    }));
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  function editHandler(id, values) {
    values.sex === '男' ? values.sex = 0 : values.sex = 1;
    values.role === '普通用户' ? values.role = 0 : values.role = 1;
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    values.sex === '男' ? values.sex = 0 : values.sex = 1;
    values.role === '普通用户' ? values.role = 0 : values.role = 1;
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'cover',
      key: 'cover',
      render: text => <img src='https://avatars0.githubusercontent.com/u/19502268?s=40&v=4' alt='图片'></img>,
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: sex => sex === 0 ? '男' : '女',
    },
    {
      title: '邮箱账户',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '权限',
      dataIndex: 'role',
      key: 'role',
      render: role => role === 0 ? '普通用户' : '管理员',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record._id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record._id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record._id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={8}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
