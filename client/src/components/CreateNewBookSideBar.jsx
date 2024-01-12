import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Space,
  message,
} from "antd";
import { toggleSideBar, triggerReload } from "../features/createNewBookSlice";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";

export const CreateNewBookSideBar = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const sideBarState = useSelector(
    (state) => state.createBookReducer.sideBarState
  );
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const onClose = () => {
    dispatch(toggleSideBar());
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const {
        author,
        bookName,
        bookPages,
        deadline,
        description,
        imageLink,
        genre,
        sittingsNumber,
      } = values;

      console.log(values);
      const response = await axios.post(
        `${baseUrl}/trackedbooks`,
        {
          author,
          bookName,
          bookPages,
          sittingsNumber,
          genre,
          imageLink,
          description,
          deadline,
        },
        {
          headers: { Authorization: `Bearer ${user.token || user}` },
        }
      );

      console.log(response.data);

      // Check the status code and show appropriate message
      if (response.status >= 200 && response.status < 300) {
        message.success("Book created successfully!");
      } else if (response.status >= 400 && response.status < 500) {
        message.error("Input error. Please check your data.");
      } else if (response.status >= 500 && response.status < 600) {
        message.error("Server error. Please try again later.");
      }

      form.resetFields();
      onClose();

      // to trigger reload of page
      dispatch(triggerReload());
    } catch (error) {
      console.error("Error submitting book:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Create a new book to be tracked"
      onClose={onClose}
      open={sideBarState}
      styles={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          bookPages: 1,
          sittingsNumber: 1,
        }}
      >
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
        <Row>
          <Col>
            <Form.Item name="imageLink" label="Image link">
              <Input
                style={{ width: "100%" }}
                addonBefore="http://"
                addonAfter=".com"
                placeholder="Please enter link to image of book cover"
              />
            </Form.Item>
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
          <Col span={8}>
            <Form.Item
              name="bookPages"
              label="Book Pages"
              rules={[
                {
                  required: true,
                  message: "Please input the pages of the book",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[
                {
                  required: true,
                  message:
                    "Please choose a deadline you wish to finish reading",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="sittingsNumber"
              label="Sittings"
              rules={[
                {
                  required: true,
                  message:
                    "Please how many sittings you want to read the book with",
                },
              ]}
            >
              <InputNumber min={1} />
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
        <Row>
          <div className="border-2 border-solid border-gray-400 w-[80%] mx-auto rounded-md p-5 my-5">
            <p>
              You should split your reading progress into sittings, which means
              every time you pick the book you achive certain amount of pages,
              with this you would conquer your reading in no time
            </p>
            <p>
              Example: I want to read a book of 200 pages, I choose to read the
              book in 10 sittings which means every time i pick up my book i
              would read 20 pages per sitting
            </p>
          </div>
        </Row>
      </Form>
    </Drawer>
  );
};
