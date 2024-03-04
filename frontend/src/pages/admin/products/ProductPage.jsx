import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Görsel",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="" style={{ width: 100 }} />,
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <>
          <span>{text.current} TL</span> <br />{" "}
          <span style={{ opacity: ".5" }}>{text.discount}% indirim</span>
        </>
      ),
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
            title="Ürünü Sil"
            description="Ürünü silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Product updated successfully");
      } else {
        message.error("Ürün Silinemedi");
      }
      message.success("Product updated successfully");
      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/categories`),
          fetch(`http://localhost:5000/api/products`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          console.log(error);
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find((item)=> item._id == categoryId)
          console.log(category)
          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });
        setDataSource(productsWithCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

export default ProductPage;
