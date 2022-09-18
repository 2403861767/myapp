import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render:(_,record) => (
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
    tip: '标题过长会自动收缩',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    tip: '标题过长会自动收缩',
    valueEnum: {
      0: { text: '男' },
      1: { text: '女',},
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    tip: '标题过长会自动收缩',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    tip: '标题过长会自动收缩',
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
    tip: '标题过长会自动收缩',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    tip: '标题过长会自动收缩',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    tip: '标题过长会自动收缩',
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];



export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
  columns={columns}
  actionRef={actionRef}
  cardBordered
  request={async (params = {}, sort, filter) => {
    console.log(sort, filter);
    const userList = await searchUsers();
    return {
      data: userList
    }
  }}
  editable={{
    type: 'multiple',
  }}
  columnsState={{
    persistenceKey: 'pro-table-singe-demos',
    persistenceType: 'localStorage',
    onChange(value) {
      console.log('value: ', value);
    },
  }}
  rowKey="id"
  search={{
    labelWidth: 'auto',
  }}
  form={{
    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    syncToUrl: (values, type) => {
      if (type === 'get') {
        return {
          ...values,
          created_at: [values.startTime, values.endTime],
        };
      }
      return values;
    },
  }}
  pagination={{
    pageSize: 5,
  }}
  dateFormatter="string"
  headerTitle="高级表格"/>
  );
};
