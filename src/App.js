import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from './redux/userSlice';
import { Table, Button, Modal, Form, Input, Card, Space, Divider, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, EnvironmentOutlined, BankOutlined, TagOutlined, NumberOutlined } from '@ant-design/icons';

const { Item } = Form;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        dispatch(editUser({ ...editingUser, ...values }));
      } else {
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        dispatch(addUser({ ...values, id: maxId + 1 }));
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id',width: 50, },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'City with Zip Code', key: 'address',
      render: (text, record) => `${record.address.city} (${record.address.zipcode})`
    },
    {
      title: 'Actions', key: 'actions', fixed: 'right', width: 120,
      render: (text, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}></Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="User Management" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Add User</Button>}>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Table 
          dataSource={users} 
          columns={columns} 
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </Card>
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingUser ? "Save" : "Add"}
        width="80%"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Form form={form} layout="vertical">
          <Divider orientation="left">Personal Information</Divider>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input placeholder="Name" prefix={<UserOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
                <Input placeholder="Username" prefix={<TagOutlined />} />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
                <Input placeholder="Email" prefix={<MailOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone!' }]}>
                <Input placeholder="Phone" prefix={<PhoneOutlined />} />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name="website" label="Website" rules={[{ required: true, message: 'Please input the website!' }]}>
                <Input placeholder="Website" prefix={<GlobalOutlined />} />
              </Item>
            </Col>
          </Row>
          <Divider orientation="left">Address</Divider>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name={['address', 'street']} label="Street" rules={[{ required: true, message: 'Please input the street!' }]}>
                <Input placeholder="Street" prefix={<HomeOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name={['address', 'suite']} label="Suite" rules={[{ required: true, message: 'Please input the suite!' }]}>
                <Input placeholder="Suite" prefix={<NumberOutlined />} />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name={['address', 'city']} label="City" rules={[{ required: true, message: 'Please input the city!' }]}>
                <Input placeholder="City" prefix={<EnvironmentOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name={['address', 'zipcode']} label="Zip Code" rules={[{ required: true, message: 'Please input the zip code!' }]}>
                <Input placeholder="Zip Code" prefix={<NumberOutlined />} />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name={['address', 'geo', 'lat']} label="Latitude" rules={[{ required: true, message: 'Please input the latitude!' }]}>
                <Input placeholder="Latitude" prefix={<EnvironmentOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name={['address', 'geo', 'lng']} label="Longitude" rules={[{ required: true, message: 'Please input the longitude!' }]}>
                <Input placeholder="Longitude" prefix={<EnvironmentOutlined />} />
              </Item>
            </Col>
          </Row>
          <Divider orientation="left">Company Information</Divider>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name={['company', 'name']} label="Company Name" rules={[{ required: true, message: 'Please input the company name!' }]}>
                <Input placeholder="Company Name" prefix={<BankOutlined />} />
              </Item>
            </Col>
            <Col xs={24} sm={12}>
              <Item name={['company', 'catchPhrase']} label="Catch Phrase" rules={[{ required: true, message: 'Please input the catch phrase!' }]}>
                <Input placeholder="Catch Phrase" prefix={<TagOutlined />} />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Item name={['company', 'bs']} label="BS" rules={[{ required: true, message: 'Please input the BS!' }]}>
                <Input placeholder="BS" prefix={<TagOutlined />} />
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
