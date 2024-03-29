import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Card, Progress, Spin, theme } from "antd";
import { toggleSideBar } from "../features/createNewBookSlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/BookDetailsModalSlice";

export const TrackedBooks = () => {
  // Get theme token
  const { token } = theme.useToken();

  // Access data from the context API provided by react-router
  const [data] = useOutletContext();
  const dispatch = useDispatch();
  const { trackedBooks, loading } = data;

  // Function to open the sidebar for creating a new book
  const openNewBookSideBar = () => {
    dispatch(toggleSideBar());
  };

  // Function to handle the book modal
  const showModal = (item) => {
    dispatch(toggleModal(item));
  };

  return (
    <div className="">
      {/* Tracked books section */}
      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full  py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          All Currently Reading Books
        </h2>

        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start lg:px-10 flex-wrap">
          {loading ? (
            <Spin size="large" />
          ) : !trackedBooks || trackedBooks.length === 0 ? (
            // Display message when no tracked books
            <div className="w-full  flex justify-center">
              <Button type="primary" className="" onClick={openNewBookSideBar}>
                Create a new Book to track
              </Button>
            </div>
          ) : (
            // Display each tracked book as a Card with progress bar
            trackedBooks.map((item) => {
              // Calculate the percentage of completed sittings
              const doneSittings = item.sittings.filter(
                (item) => item.isComplete
              ).length;
              const totalSittings = item.sittings.length;
              const percentage = Math.ceil(
                (doneSittings / totalSittings) * 100
              );

              return (
                <Card
                  key={item._id}
                  hoverable
                  onClick={() => showModal(item)}
                  className="shadow-md hover:shadow-2xl transform hover:scale-95 w-[100px] lg:w-[170px] transition duration-300 ease-in-out"
                  size="small"
                  cover={<img className="h-20 lg:h-40" src={item.imageLink} />}
                >
                  <h1 className="font-bold text-[10px] lg:text-sm line-clamp-1">
                    {item.bookName}
                  </h1>
                  <span className="text-[10px] lg:text-sm">{item.author}</span>
                  {/* Progress bar showing completion percentage */}
                  <Progress
                    trailColor={token.colorTextBase}
                    strokeColor={token.colorPrimary}
                    type="line"
                    showInfo={true}
                    size={"small"}
                    percent={percentage}
                    format={(percent) => `${percent}%`}
                  />
                </Card>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
