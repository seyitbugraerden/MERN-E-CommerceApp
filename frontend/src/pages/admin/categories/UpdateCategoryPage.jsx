import { Button, Input, Form, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Corrected 'Json' to 'JSON'
        }
      );
      if (response.ok) {
        message.success("Değişiklik Başarılı");
      } else {
        message.error("Değişiklikler Yapılamadı");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    navigate("/admin/categories");
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [categoryId, form]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateCategoryPage;
