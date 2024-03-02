import { Input, Form, message, Spin, InputNumber, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreateProductPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    const imgLinks = values.img
      .split("\n")
      .map((link) => link.trim())
      .filter((trimmedLink) => trimmedLink !== "");
    const colors = values.colors
      .split("\n")
      .map((color) => color.trim())
      .filter((trimmedColor) => trimmedColor !== "");
    const sizes = values.sizes
      .split("\n")
      .map((color) => color.trim())
      .filter((trimmedColor) => trimmedColor !== "");
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          img: imgLinks,
          colors,
          sizes,
        }),
      });
      if (response.ok) {
        message.success("Ürün Oluşturuldu");
        navigate("/admin/products");
      } else {
        message.error("Ürün Oluşturulamadı");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ürün Fiyatı"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen indirim oranını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen ürün kategorisi girin!",
            },
          ]}
        >
          <Select>
            {categories.map((item) => (
              <Select.Option value={item._id} key={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ürün Görselleri (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen 4 adet ürün görsel linkini girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Ürün görselleri sırayla giriniz."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RGB)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen geçerli ürün renklerini yazınız",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Lütfen geçerli ürün renklerini yazınız (RGB)"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenlerini Giriniz"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen geçerli ürün bedenlerini yazınız",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Lütfen geçerli ürün bedenlerini yazınız"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Detayı Giriniz"
          name="description"
          rules={[
            {
              required: true,
              message: "Ürün Detayı Giriniz",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
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

export default CreateProductPage;
