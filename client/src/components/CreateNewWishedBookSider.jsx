import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Popover,
  Row,
  Space,
  message,
} from "antd";
import {
  toggleWishedBookSider,
  triggerReload,
} from "../features/createNewBookSlice";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";

export const CreateNewWishedBookSider = () => {
  const wishedSiderState = useSelector(
    (state) => state.createBookReducer.toggleWishedSider
  );
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { author, bookName, description, imageLink, genre } = values;

      console.log(values);
      const { token } = user;
      const response = await axios.post(
        `${baseUrl}/wishedbooks`,
        {
          author,
          bookName,
          description,
          imageLink,
          genre,
        },
        {
          headers: { Authorization: `Bearer ${token || user}` },
        }
      );

      console.log(response.data);

      // Check the status code and show appropriate message
      if (response.status >= 200 && response.status < 300) {
        message.success("Wished book created successfully!");
        form.resetFields();
      } else {
        message.error("Failed to create wished book. Please try again later.");
      }

      onClose();
      // to trigger reload of page
      dispatch(triggerReload());
    } catch (error) {
      console.error("Error submitting wished book:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Close Sider
  const onClose = () => {
    dispatch(toggleWishedBookSider());
  };

  return (
    <Drawer
      title="Create wished Book"
      onClose={() => {
        onClose();
      }}
      open={wishedSiderState}
      styles={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Row>
          <Col>
            <Form.Item
              name="bookName"
              label="Book name"
              rules={[
                {
                  required: true,
                  message: "Please enter user Book name",
                },
              ]}
            >
              <Input placeholder="Please enter Book name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="imageLink" label="Book cover Image link">
              <Input
                style={{ width: "100%" }}
                placeholder="Please enter link to image of book cover"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p className="text-xs text-yellow-500">
              You can copy a link to the book image anywhere online and paste
              that link here to have your book cover
            </p>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                  message: "Please input the authors name",
                },
              ]}
            >
              <Input placeholder="Please enter Author of book" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="genre"
              label="Genre"
              rules={[
                {
                  required: true,
                  message: "Please input the Books Genre",
                },
              ]}
            >
              <Input placeholder="Please enter the Genre" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="You can enter Description of the book here"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}></Col>
        </Row>
      </Form>
    </Drawer>
  );
};
