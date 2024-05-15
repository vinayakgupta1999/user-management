import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserDetail = () => {
  const { userId } = useParams();
  const history = useHistory();
  const user = useSelector(state => state.user.users.find(user => user.id === Number(userId)));

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>Back</Button>
      <Card title={`User Details - ${user.name}`}>
        <p><b>ID:</b> {user.id}</p>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>
        <p><b>Address:</b> {`${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})`}</p>
        <p><b>Geo:</b> {`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`}</p>
        <p><b>Company:</b> {user.company.name}</p>
        <p><b>Catch Phrase:</b> {user.company.catchPhrase}</p>
        <p><b>BS:</b> {user.company.bs}</p>
      </Card>
    </div>
  );
};

export default UserDetail;
