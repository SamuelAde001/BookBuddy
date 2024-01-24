import React, { useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Modal,
  Spin,
  message,
  Popover,
  Select,
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
                <Input
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    form.setFieldsValue({ bookName: trimmedValue });
                  }}
                  placeholder="Please enter Book name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="imageLink"
                label="Book cover Image link"
                rules={[
                  {
                    type: "url",
                    message: "Must be a link to an Image",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    form.setFieldsValue({ imageLink: trimmedValue });
                  }}
                  placeholder="Please enter link to image of book cover"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p className="text-xs">
                You can copy a link to the book image anywhere online and paste
                that link here to have your book cover
              </p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Please enter user Author name",
                  },
                ]}
                label="Author"
              >
                <Input
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    form.setFieldsValue({ author: trimmedValue });
                  }}
                  placeholder="Please enter Author of book"
                />
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
                <Select
                  placeholder="Choose Genre"
                  options={[
                    {
                      value: "Religion",
                      label: "Religion",
                    },
                    {
                      value: "Motivational",
                      label: "Motivational",
                    },
                    {
                      value: "Action and Adventure",
                      label: "Action and Adventure",
                    },
                    {
                      value: "Mystery",
                      label: "Mystery",
                    },
                    {
                      value: "Fantasy",
                      label: "Fantasy",
                    },
                    {
                      value: "Fiction",
                      label: "Fiction",
                    },
                    {
                      value: "Education",
                      label: "Education",
                    },
                    {
                      value: "History",
                      label: "History",
                    },
                    {
                      value: "Others",
                      label: "Others",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          {bookDetails.deadline && (
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="bookPages"
                  rules={[
                    {
                      required: true,
                      message: "Please enter pages",
                    },
                    {
                      type: "number",
                      message: "Pages must be a number",
                    },
                  ]}
                  label="Book Pages"
                >
                  <InputNumber
                    onBlur={(e) => {
                      const trimmedValue = e.target.value.trim();
                      const parsedValue = parseFloat(trimmedValue);

                      if (!isNaN(parsedValue)) {
                        form.setFieldsValue({ bookPages: parsedValue });
                      }
                    }}
                    min={1}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="deadline"
                  rules={[
                    {
                      required: true,
                      message: "Please enter book deadline",
                    },
                  ]}
                  label="Deadline"
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
                        "Please how many sittings you want to read the book with and must be a number",
                    },
                    {
                      type: "number",
                      message: "Sittings must be a number",
                    },
                  ]}
                >
                  <InputNumber
                    onBlur={(e) => {
                      const trimmedValue = e.target.value.trim();
                      const parsedValue = parseFloat(trimmedValue);

                      if (!isNaN(parsedValue)) {
                        form.setFieldsValue({ sittingsNumber: parsedValue });
                      }
                    }}
                    min={1}
                    max={30}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  onBlur={(e) => {
                    const trimmedValue = e.target.value.trim();
                    form.setFieldsValue({ description: trimmedValue });
                  }}
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
