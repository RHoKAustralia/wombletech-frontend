import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import useAxios from "axios-hooks";
import "./styles.css";

type FormValues = {
  name: string;
  email: string;
  phoneNumber?: string;
  region: string;
  suburb: string;
  description?: string;
  donationType: string;
};

const DonationForm: React.VFC = () => {
  const [{ data, loading, error }, execute] = useAxios(
    "https://gopf9uamhd.execute-api.ap-southeast-2.amazonaws.com/Prod/donation_submit",
    {
      manual: true,
    }
  );

  const onFinish = async (formValues: FormValues) => {
    const result = await execute({
      method: "POST",
      data: formValues,
    });

    if (result.status !== 200) {
      message.error("Something went wrong");
      return;
    }

    message.success("Form submitted successfully");
  };

  return (
    <div className="formContainer">
      <Form
        name="donationForm"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item
          label="Region"
          name="region"
          rules={[{ required: true, message: "Please select your region." }]}
        >
          <Select placeholder="Please select your state">
            <Select.Option value="vic_melbourne">
              VIC - Melbourne - Ready Now!
            </Select.Option>
            <Select.Option value="qld_brisbane">
              QLD - Brisbane - Ready Now!
            </Select.Option>
            <Select.Option value="qld_goldcoast">
              QLD - Gold Coast - Coming soon!
            </Select.Option>
            <Select.Option value="nsw_sydney">
              NSW - Sydney - Coming soon!
            </Select.Option>
            <Select.Option value="aus_other">
              Australia - Other (please specify) - Timing TBC!
            </Select.Option>
            <Select.Option value="outside_aus">
              Outside Australia - Please register your interest for future
              expansion.
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Suburb"
          name="suburb"
          rules={[{ required: true, message: "Please enter your suburb." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type of Donation"
          name="donationType"
          rules={[
            { required: true, message: "Please select a donation type." },
          ]}
        >
          <Select placeholder="Please select your state">
            <Select.Option value="onceOff">Once-off donations</Select.Option>
            <Select.Option value="regular">
              Can help with regular donations
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Extra Information" name="description">
          <Input.TextArea placeholder="Please tell us more about the equipment you have available, and location where you would like to have it picked up from, and any info about preferred timings, etc." />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 32 }}>
          <div className="formButton">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DonationForm;
