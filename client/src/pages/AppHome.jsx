import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button, Card, Progress, Spin, theme } from "antd";
import {
  toggleSideBar,
  toggleWishedBookSider,
} from "../features/createNewBookSlice";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/BookDetailsModalSlice";
import { CreateNewWishedBookSider } from "../components/CreateNewWishedBookSider";
import { FaBook } from "react-icons/fa6";

export const AppHome = () => {
  const { token } = theme.useToken();
  const [data] = useOutletContext();
  const dispatch = useDispatch();

  const { trackedBooks, loading, readBooks, wishedBooks } = data;

  // function to return last 3 books user passed
  const lastFourCurrentlyreading =
    trackedBooks !== null && trackedBooks.slice(-4);

  const lastFourReadBooks = readBooks !== null && readBooks.slice(-4);

  // function to create a new Book
  const openNewBookSideBar = () => {
    dispatch(toggleSideBar());
  };

  // function to open sider for new wished books
  const openNewWishedBookSider = () => {
    dispatch(toggleWishedBookSider());
  };
  // function to handle book Modal
  const showModal = (item) => {
    dispatch(toggleModal(item));
  };

  return (
    <div className="space-y-10">
      {/* tracked books list */}
      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full min-h-[300px] py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          Currently reading Books
        </h2>

        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start flex-wrap">
          {loading ? (
            <Spin size="large" />
          ) : !trackedBooks || trackedBooks.length === 0 ? (
            <div className="w-full  flex justify-center">
              <Button type="primary" className="" onClick={openNewBookSideBar}>
                Create a new Book to track
              </Button>
            </div>
          ) : (
            lastFourCurrentlyreading.map((item) => {
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

          {trackedBooks &&
            trackedBooks.length > 0 &&
            trackedBooks.length > 4 && (
              <div className="flex flex-col mx-5 gap-10">
                <Button type="primary">
                  <Link to="/apphome/currentreads">All Current reads</Link>
                </Button>
                <Button type="primary">
                  <Link to="/apphome/readbooks">All Read Books</Link>
                </Button>
              </div>
            )}
        </div>
      </section>

      {/*  read books list */}
      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full min-h-[300px] py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          Read Books
        </h2>

        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start  flex-wrap">
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
            lastFourReadBooks.map((item) => {
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

          {readBooks && readBooks.length > 0 && readBooks.length > 4 && (
            <div className="flex flex-col gap-10">
              <Button type="primary">
                <Link to="/apphome/currentreads">All Current reads</Link>
              </Button>
              <Button type="primary">
                <Link to="/apphome/readbooks">All Read Books</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className="w-full  py-5 rounded-lg"
      >
        <h2 style={{ color: token.colorTextBase }} className="text-center">
          Wish List
        </h2>

        {wishedBooks?.length !== 0 && (
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
        <div className="flex gap-10 items-center my-10 justify-center lg:justify-start  flex-wrap">
          {loading ? (
            <Spin size="large" />
          ) : !wishedBooks || wishedBooks.length === 0 ? (
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
            wishedBooks.map((item) => {
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
                </Card>
              );
            })
          )}
        </div>
      </section>
      <CreateNewWishedBookSider />
    </div>
  );
};
