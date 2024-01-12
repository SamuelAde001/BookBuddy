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
  toggleWishedBookUpdateModal,
} from "../features/BookDetailsModalSlice";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";
import { triggerReload } from "../features/createNewBookSlice";
import axios from "axios";

export const WishedBookUpdateModal = ({ bookDetails }) => {
  const modalState = useSelector(
    (state) => state.BookDetailsModalReducer.wishedBookUpdateModal
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const values = await form.validateFields();

    const { bookPages, deadline, sittingsNumber } = values;

    const fullDetails = { ...bookDetails, bookPages, deadline, sittingsNumber };

    try {
      const response = await axios.post(
        `${baseUrl}/trackedbooks`,
        fullDetails,
        {
          headers: { Authorization: `Bearer ${user.token || user}` },
        }
      );

      console.log(response.data);
      // if adding the book to tracked books was successful then we can go on and delete the book from wished books
      if (response.status >= 200 && response.status < 300) {
        try {
          const response = await axios.delete(
            `${baseUrl}/deletewishedbooks/${bookDetails._id}`,
            {
              headers: { Authorization: `Bearer ${user.token || user}` },
            }
          );
          if (response.status >= 200 && response.status < 300) {
            message.success("Book updated successfully!");
          }
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        message.error("Failed to update book. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      message.error("An error occurred. Please try again later.");
    }

    // close main modal
    dispatch(toggleModal());

    // close the modal
    dispatch(toggleWishedBookUpdateModal());

    // to trigger reload of page
    dispatch(triggerReload());

    setLoading(false);
  };

  const handleCancel = () => {
    dispatch(toggleWishedBookUpdateModal());
  };
  return (
    <>
      <Modal
        title="Update Book"
        open={modalState}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {loading && (
          <Spin size="large" className="absolute top-[50%] left-[50%]" />
        )}
        <Form form={form} layout="vertical" requiredMark={false}>
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
        </Form>
      </Modal>
    </>
  );
};
