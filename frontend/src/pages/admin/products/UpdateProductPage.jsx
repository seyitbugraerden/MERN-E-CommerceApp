import { Input, Form, message, Spin, InputNumber, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function UpdateProductPage() {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
          const imgLinksText = data.img.join("\n");
          const colorsText = data.colors.join("\n");
          const sizesText = data.sizes.join("\n");

          form.setFieldsValue({
            name: data.name,
            current: data.price.current,
            discount: data.price.discount,
            category: data.category,
            img: imgLinksText,
            colors: colorsText,
            sizes: sizesText,
            description: data.description,
          });
        } else {
          message.error("Failed to fetch product data");
        }
      } catch (error) {
        console.log(error);
        message.error("An error occurred while fetching product data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [form, productId]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            price: {
              current: values.current,
              discount: values.discount,
            },
            img: values.img.split("\n"), // Split the text into an array
            colors: values.colors.split("\n"), // Split the text into an array
            sizes: values.sizes.split("\n"), // Split the text into an array
          }),
        }
      );
      if (response.ok) {
        message.success("Product updated successfully");
        navigate("/admin/products");
      } else {
        message.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the product name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please enter the product price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Discount Rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please enter the discount rate",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select the product category",
            },
          ]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Product Images (Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please enter 4 product image links",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter product image links separated by new lines"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Colors (RGB)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please enter valid product colors (RGB)",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter valid product colors (RGB) separated by new lines"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Sizes"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please enter valid product sizes",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter valid product sizes separated by new lines"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the product description",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateProductPage;
