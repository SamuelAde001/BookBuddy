import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Card, Spin, theme } from "antd";
import { toggleWishedBookSider } from "../features/createNewBookSlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/BookDetailsModalSlice";
import { CreateNewWishedBookSider } from "../components/CreateNewWishedBookSider";
import { FaBook } from "react-icons/fa6";

export const WishList = () => {
  // Get theme token
  const { token } = theme.useToken();

  // Access data from the context API provided by react-router
  const [data] = useOutletContext();
  const dispatch = useDispatch();
  const { loading, wishedBooks } = data;

  // Function to open the sider for creating new wished books
  const openNewWishedBookSider = () => {
    dispatch(toggleWishedBookSider());
  };

  // Function to handle the book modal
  const showModal = (item) => {
    dispatch(toggleModal(item));
  };

  return (
    <div className="">
      {/* Wishlist section */}
      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full  py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          Wish List
        </h2>

        {wishedBooks.length !== 0 && (
          <div
            className="flex justify-center
          pt-5"
          >
            <Button
              type="primary"
              className=""
              onClick={() => {
                openNewWishedBookSider();
              }}
            >
              Create Book
            </Button>
          </div>
        )}

        {/* Display wished books */}
        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start px-10 flex-wrap">
          {loading ? (
            <Spin size="large" />
          ) : !wishedBooks || wishedBooks.length === 0 ? (
            // Display message when no wished books
            <div className="w-full flex-col gap-5 space-y-5 items-center justify-center">
              <h2 style={{ color: token.colorText }} className="text-center">
                You can add a book you wish to read in the future
              </h2>
              <div className=" flex justify-center">
                <Button
                  type="primary"
                  onClick={() => {
                    openNewWishedBookSider();
                  }}
                  icon={<FaBook />}
                >
                  Create Book
                </Button>
              </div>
            </div>
          ) : (
            // Display each wished book as a Card
            wishedBooks.map((item) => {
              return (
                <Card
                  key={item._id}
                  hoverable
                  onClick={() => showModal(item)}
                  className="shadow-md hover:shadow-2xl transform hover:scale-95 transition duration-300 ease-in-out"
                  size="small"
                  style={{
                    width: 170,
                  }}
                  cover={<img className="h-40" src={item.imageLink} />}
                >
                  <h1 className="font-bold text-sm line-clamp-1">
                    {item.bookName}
                  </h1>
                  <span>{item.author}</span>
                </Card>
              );
            })
          )}
        </div>
      </section>

      {/* Sider for creating new wished books */}
      <CreateNewWishedBookSider />
    </div>
  );
};
