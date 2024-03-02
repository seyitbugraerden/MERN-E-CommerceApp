import { Button, Input, Form, message, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCategoryPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori Oluşturuldu");
        navigate("/admin/categories");
      } else {
        message.error("Kategori Oluşturulamadı");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Kategori İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kategori Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default CreateCategoryPage;
