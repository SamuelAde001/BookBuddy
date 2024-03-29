import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card, Progress, Spin, theme } from "antd";
import { toggleSideBar } from "../features/createNewBookSlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/BookDetailsModalSlice";

export const ReadBooks = () => {
  const { token } = theme.useToken();
  const [data] = useOutletContext();
  const dispatch = useDispatch();

  const { loading, readBooks } = data;

  // function to create a new Book
  const openNewBookSideBar = () => {
    dispatch(toggleSideBar());
  };

  // function to handle book Modal
  const showModal = (item) => {
    dispatch(toggleModal(item));
  };

  return (
    <div className="">
      {/*  read books list */}
      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full  py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          All Read Books
        </h2>

        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start lg:px-10 flex-wrap">
          {loading ? (
            <Spin size="large" />
          ) : !readBooks || readBooks.length === 0 ? (
            <div className="w-full  flex justify-center">
              <h2 style={{ color: token.colorText }} className="text-center">
                You haven't finished any book yet
                <br />
                Read Harder :)
              </h2>
            </div>
          ) : (
            readBooks.map((item) => {
              // find out how many percent of the sittings is done
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
                  <Progress
                    trailColor={token.colorTextBase}
                    strokeColor={token.colorPrimary}
                    type="line"
                    showInfo={true}
                    size={"small"}
                    percent={percentage}
                    format={(percent) => `${percent}`}
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
