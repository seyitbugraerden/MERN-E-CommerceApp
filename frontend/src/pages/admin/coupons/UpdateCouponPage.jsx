import { Button, Input, Form, message, Spin, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCouponPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponId}`,
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

    navigate("/admin/coupons");
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/coupons/${couponId}`
        );

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [couponId, form]);

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
          label="Kupon Kodu"
          name="code"
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
          label="İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <InputNumber />
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

export default UpdateCouponPage;
