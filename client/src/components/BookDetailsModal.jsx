import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Modal,
  Row,
  message,
  theme,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  toggleUpdateBooksModal,
  toggleWishedBookUpdateModal,
} from "../features/BookDetailsModalSlice";
import axios from "axios";
import { baseUrl } from "../../utils/helper";
import { triggerReload } from "../features/createNewBookSlice";
import { useAuthContext } from "../hooks/useAuthContext";
import { createStyles, useTheme } from "antd-style";
import { UpdateBookDetailsModal } from "./UpdateBookDetailsModal";
import { WishedBookUpdateModal } from "./WishedBookUpdateModal";
import { MdDelete } from "react-icons/md";

const useStyle = createStyles(({ token }) => ({
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
}));

export const BookDetailsModal = () => {
  // initialization of variables
  const modalState = useSelector(
    (state) => state.BookDetailsModalReducer.modalOpen
  );
  const bookDetails = useSelector(
    (state) => state.BookDetailsModalReducer.bookDetails
  );
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [sittings, setSittings] = useState(bookDetails?.sittings || []);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { styles } = useStyle();

  // formatting the date from book details
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-GB");
  };

  // Function to handle checkbox change
  const handleSittings = (index) => {
    setSittings((prevSittings) => {
      const updatedSittings = [...prevSittings]; // Create a shallow copy of the array
      updatedSittings[index] = {
        ...updatedSittings[index], // Create a shallow copy of the object
        isComplete: !updatedSittings[index].isComplete,
      };
      return updatedSittings;
    });
  };

  // useEffect to change the value of Sittings checkboxes if sittings change in the database
  useEffect(() => {
    setSittings(bookDetails?.sittings);
  }, [bookDetails?.sittings]);

  // handle the submit button
  const handleSubmit = async () => {
    // find out how many percent of the sittings is done
    const doneSittings = sittings.filter((item) => item.isComplete).length;
    const totalSittings = sittings.length;
    const percentage = Math.ceil((doneSittings / totalSittings) * 100);

    // submit the latest uodate of the sittings to the backend

    // if bookdeatils has deadline, it is a tracked book else it is a wished book
    if (bookDetails.deadline) {
      try {
        // If the percentage is 100, update the isRead value
        if (percentage === 100) {
          const response = await axios.put(
            `${baseUrl}/updatebooks/${bookDetails._id}`,
            {
              sittings,
              isRead: true, // Update isRead to true if percentage is 100
            },
            {
              headers: { Authorization: `Bearer ${user.token || user}` },
            }
          );

          // Check the status code and show appropriate message
          if (response.status >= 200 && response.status < 300) {
            message.success("Book details updated successfully!");
          } else if (response.status >= 400 && response.status < 500) {
            message.error("Input error. Please check your data.");
          } else if (response.status >= 500 && response.status < 600) {
            message.error("Server error. Please try again later.");
          }
        } else {
          // If percentage is not 100, update without changing isRead
          const response = await axios.put(
            `${baseUrl}/updatebooks/${bookDetails._id}`,
            {
              sittings,
              isRead: false,
            },
            {
              headers: { Authorization: `Bearer ${user.token || user}` },
            }
          );

          // Check the status code and show appropriate message
          if (response.status >= 200 && response.status < 300) {
            message.success("Book details updated successfully!");
          } else if (response.status >= 400 && response.status < 500) {
            message.error("Input error. Please check your data.");
          } else if (response.status >= 500 && response.status < 600) {
            message.error("Server error. Please try again later.");
          }
          console.log(response.data);
        }
      } catch (error) {
        // Handle other errors here
        console.error(error);
        message.error("An error occurred. Please try again later.");
      }
    }

    // to trigger reload of page
    dispatch(triggerReload());

    // close the modal
    dispatch(toggleModal());
  };

  const handleCancel = () => {
    dispatch(toggleModal());
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this book?",
      onOk: async () => {
        if (bookDetails.deadline) {
          try {
            const response = await axios.delete(
              `${baseUrl}/deletebooks/${bookDetails._id}`,
              {
                headers: { Authorization: `Bearer ${user.token || user}` },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.delete(
              `${baseUrl}/deletewishedbooks/${bookDetails._id}`,
              {
                headers: { Authorization: `Bearer ${user.token || user}` },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }

        // to trigger reload of page
        dispatch(triggerReload());

        // close the modal
        dispatch(toggleModal());
      },
      onCancel: () => {
        // Do nothing if the user cancels the deletion
      },
    });
  };

  // handle update of the books

  const handleUpdate = () => {
    dispatch(toggleUpdateBooksModal());
  };

  // fuction for updating wished book to current book
  const handleWishBookToCurrentBook = () => {
    dispatch(toggleWishedBookUpdateModal());
  };

  // modal stylings
  const classNames = {
    mask: styles["my-modal-mask"],
  };
  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <>
      {bookDetails && (
        <Modal
          title={<h2 className="text-center">{bookDetails.bookName}</h2>}
          open={modalState}
          onOk={() => handleSubmit()}
          onCancel={handleCancel}
          className="top-5"
          classNames={classNames}
          styles={modalStyles}
          footer={[
            <Button key="Cancel" onClick={() => handleCancel()}>
              Cancel
            </Button>,
            <Button
              key="delete"
              onClick={() => handleDelete()}
              icon={<MdDelete />}
            />,

            <Button key="update" onClick={() => handleUpdate()}>
              Update Book
            </Button>,
            <Button
              key="submit"
              disabled={!bookDetails?.deadline ? true : false}
              type="primary"
              onClick={() => handleSubmit()}
            >
              Sumbit
            </Button>,
          ]}
        >
          {/* image */}
          <div className="w-[20%]  mx-auto">
            <img
              src={bookDetails.imageLink}
              className="w-full mx-auto"
              alt=""
            />
          </div>

          {/* author */}
          <p>
            <span style={{ color: token.colorTextBase }} className="font-bold">
              Authur:
            </span>{" "}
            {bookDetails.author}
          </p>
          <Divider style={{ backgroundColor: token.colorText }} />

          {/* pages */}
          <div className="flex gap-10">
            {bookDetails.deadline && (
              <p>
                {" "}
                <span
                  style={{ color: token.colorTextBase }}
                  className="font-bold"
                >
                  Pages:
                </span>{" "}
                {bookDetails.bookPages}
              </p>
            )}

            {/* genre */}
            <p>
              {" "}
              <span
                style={{ color: token.colorTextBase }}
                className="font-bold"
              >
                Genre:
              </span>{" "}
              {bookDetails.genre}
            </p>

            {/* date started */}
            {bookDetails.deadline && (
              <p>
                {" "}
                <span
                  style={{ color: token.colorTextBase }}
                  className="font-bold"
                >
                  Date Started:
                </span>{" "}
                {formatDate(bookDetails.dateOfBookInput)}
              </p>
            )}

            {/* Deadline */}
            {bookDetails.deadline && (
              <p>
                {" "}
                <span
                  style={{ color: token.colorTextBase }}
                  className="font-bold"
                >
                  Deadline:
                </span>{" "}
                {formatDate(bookDetails.deadline)}
              </p>
            )}
          </div>
          <Divider style={{ backgroundColor: token.colorText }} />

          {/* finished */}
          {bookDetails.deadline && (
            <p>
              {" "}
              <span
                style={{ color: token.colorTextBase }}
                className="font-bold"
              >
                Fineshed?
              </span>{" "}
              {bookDetails.isRead ? "Yes" : "No"}
            </p>
          )}
          {bookDetails.deadline && (
            <Divider style={{ backgroundColor: token.colorText }} />
          )}

          {/* date Finished */}
          {bookDetails.dateFinishedReading && (
            <p>Date Finished {formatDate(bookDetails.dateFinishedReading)}</p>
          )}

          {/* sittings */}
          {bookDetails.deadline && (
            <div className="space-x-3">
              <span
                style={{ color: token.colorTextBase }}
                className="font-bold"
              >
                Sittings:
              </span>
              <span>
                Pages/sitting: {sittings && sittings[1].pagePerSitting}
              </span>
              <br />
              <br />
              <span className="space-x-2">
                {sittings?.map((item, index) => (
                  <Checkbox
                    key={index}
                    onChange={() => {
                      handleSittings(index);
                    }}
                    checked={item.isComplete}
                  >
                    {index + 1}
                  </Checkbox>
                ))}
              </span>
            </div>
          )}
          {bookDetails.deadline && (
            <Divider style={{ backgroundColor: token.colorText }} />
          )}

          {/* description */}
          <p>
            <span style={{ color: token.colorTextBase }} className="font-bold">
              Description:
            </span>{" "}
            {bookDetails.description}
          </p>
          <Divider style={{ backgroundColor: token.colorText }} />

          {/* modal for updating books */}
          <UpdateBookDetailsModal bookDetails={bookDetails} />

          {/* if book was a wished book */}
          {!bookDetails.deadline && (
            <Button onClick={handleWishBookToCurrentBook}>
              Add to Current Books
            </Button>
          )}
          {!bookDetails.deadline && (
            <Divider style={{ backgroundColor: token.colorText }} />
          )}

          <WishedBookUpdateModal bookDetails={bookDetails} />
        </Modal>
      )}
    </>
  );
};
