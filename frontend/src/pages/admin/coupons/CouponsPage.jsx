import React, { useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b>{text} %</b>,
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
        `http://localhost:5000/api/coupons/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Kupon Silindi");
      } else {
        message.error("Kupon Silinemedi");
      }
      window.location.href = "/admin/coupons";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/coupons`);
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
