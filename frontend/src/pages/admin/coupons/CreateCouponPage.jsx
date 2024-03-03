import { Button, Input, Form, message, Spin, InputNumber } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCouponPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon Oluşturuldu");
        navigate("/admin/coupons");
      } else {
        message.error("Kupon Oluşturulamadı");
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
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kKupon Kodu Girin!",
            },
          ]}
        >
          <Input placeholder="Lütfen kKupon Kodu Girin!" />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Kupon İndirim Oranını Girin",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kupon Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default CreateCouponPage;
