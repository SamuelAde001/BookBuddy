import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Modal,
  Spin,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  toggleUpdateBooksModal,
} from "../features/BookDetailsModalSlice";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";
import { triggerReload } from "../features/createNewBookSlice";
import axios from "axios";

export const UpdateBookDetailsModal = ({ bookDetails }) => {
  const modalState = useSelector(
    (state) => state.BookDetailsModalReducer.updateBookModalState
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    dispatch(toggleUpdateBooksModal());
  };

  const handleSubmit = async () => {
    setLoading(true);
    const values = await form.validateFields();

    console.log(values);
    // if it is a book with a deadline
    if (bookDetails.deadline) {
      try {
        const response = await axios.put(
          `${baseUrl}/updatebooks/${bookDetails._id}`,
          values,
          {
            headers: { Authorization: `Bearer ${user.token || user}` },
          }
        );
        console.log(response.data);

        // Check the status code and show appropriate message
        if (response.status >= 200 && response.status < 300) {
          message.success("Book updated successfully!");
        } else {
          message.error("Failed to update book. Please try again later.");
        }
      } catch (error) {
        console.error("Error updating book:", error);
        message.error("An error occurred. Please try again later.");
      }
    } else {
      // if it is a wish list book
      try {
        const response = await axios.put(
          `${baseUrl}/updatewishedbooks/${bookDetails._id}`,
          values,
          {
            headers: { Authorization: `Bearer ${user.token || user}` },
          }
        );

        console.log(response.data);
        // Check the status code and show appropriate message
        if (response.status >= 200 && response.status < 300) {
          message.success("Book updated successfully!");
        } else {
          message.error("Failed to update book. Please try again later.");
        }
      } catch (error) {
        console.error("Error updating book:", error);
        message.error("An error occurred. Please try again later.");
      }
    }

    // close main modal
    dispatch(toggleModal());

    // close the modal
    dispatch(toggleUpdateBooksModal());

    // to trigger reload of page
    dispatch(triggerReload());

    setLoading(false);
  };

  const handleCancel = () => {
    dispatch(toggleUpdateBooksModal());
  };
  return (
    <>
      <Modal
        title="Update Book"
        open={modalState}
        onOk={handleSubmit}
        className="top-5"
        onCancel={handleCancel}
      >
        {loading && (
          <Spin size="large" className="absolute top-[50%] left-[50%]" />
        )}
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            author: bookDetails.author,
            bookName: bookDetails.bookName,
            bookPages: bookDetails.bookPages,
            sittingsNumber: bookDetails.sittings?.length,
            genre: bookDetails.genre,
            imageLink: bookDetails.imageLink,
            description: bookDetails.description,
          }}
        >
          <Row>
            <Col>
              <Form.Item name="bookName" label="Book name">
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
              <Form.Item name="author" label="Author">
                <Input placeholder="Please enter Author of book" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="genre" label="Genre">
                <Input placeholder="Please enter the Genre" />
              </Form.Item>
            </Col>
          </Row>
          {bookDetails.deadline && (
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="bookPages" label="Book Pages">
                  <InputNumber min={1} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="deadline" label="Deadline">
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="sittingsNumber" label="Sittings">
                  <InputNumber min={1} />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
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
      </Modal>
    </>
  );
};
