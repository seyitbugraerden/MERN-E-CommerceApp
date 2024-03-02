import React, { useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";

function UserPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt=""
          style={{ height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (text, record) => (
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${userEmail}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Kullanıcı Silindi");
      } else {
        message.error("Kullanıcı Silinemedi");
      }
      window.location.href = "/admin/users";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`);
      if (response.ok) {
        const data = await response.json();

        setDataSource(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </>
  );
}

export default UserPage;
