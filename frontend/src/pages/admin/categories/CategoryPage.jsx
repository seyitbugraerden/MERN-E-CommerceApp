import React, { useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kategori Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="" style={{ width: 100 }} />,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Ouşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              navigate(`update/${record._id}`);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Kategori Silindi");
      } else {
        message.error("Kategori Silinemedi");
      }
      window.location.href = "/admin/categories";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
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
    fetchCategories();
  }, [fetchCategories]);

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

export default CategoryPage;
