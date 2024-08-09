import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { DashOutlined } from "@ant-design/icons";
import {
  Badge,
  Dropdown,
  Menu,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { DndProvider } from "react-dnd";
import { Box } from "./Box";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IMAGES } from "../../asset/images-3x2";

export const Test = () => {
  const [maximizedBoxIndex, setMaximizedBoxIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState<string[]>([
    `${IMAGES.img1}`,
    `${IMAGES.img2}`,
    `${IMAGES.img3}`,
    `${IMAGES.img4}`,
    `${IMAGES.img5}`,
    `${IMAGES.img6}`,
  ]);
  const [hiddenBoxes, setHiddenBoxes] = useState<string[]>([]);
  const moveBox = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedBoxes = [...boxes];
      [updatedBoxes[dragIndex], updatedBoxes[hoverIndex]] = [
        updatedBoxes[hoverIndex],
        updatedBoxes[dragIndex],
      ];
      setBoxes(updatedBoxes);
    },
    [boxes]
  );

  const items = (imageIndex: number) => [
    {
      key: "1",
      label: `${maximizedBoxIndex !== imageIndex ? "Full screen" : "Exit full screen"}`,
      onClick: () => onclickShowMax(0, imageIndex),
    },
    {
      key: "2",
      label: "Hide",
      onClick: () => onclickShowMax(1, imageIndex),
    },
  ];

  const onclickShowMax = (key: number, imageIndex: number) => {
    switch (key) {
      case 0:
        if (maximizedBoxIndex === imageIndex) {
          setMaximizedBoxIndex(null);
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        } else {
          setMaximizedBoxIndex(imageIndex);
          document.documentElement.requestFullscreen();
        }
        break;
      case 1:
        setBoxes((prevBoxes) => {
          const boxToHide = prevBoxes[imageIndex];
          setHiddenBoxes((prevHiddenBoxes) => [...prevHiddenBoxes, boxToHide]);
          setShow(true);
          return prevBoxes.filter((_, index) => index !== imageIndex);
        });
        setMaximizedBoxIndex(null);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
      default:
        break;
    }
  };
  const onShow = () => {
    setLoading(true);
    setTimeout(() => {
      if (show) {
        setShow(false);
        setBoxes((prevBoxes) => [...prevBoxes, ...hiddenBoxes]);
        setHiddenBoxes([]);
      }
      setLoading(false);
    }, 500);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`container py-5 w-full h-[100vh] items-center m-auto grid ${
          maximizedBoxIndex !== null ? "grid-cols-1" : "grid-cols-3"
        } gap-[20px]`}
      >
        {boxes.map((src, index) => (
          <Box
            key={index}
            src={src}
            index={index}
            moveBox={moveBox}
            maximizedBoxIndex={maximizedBoxIndex}
            setMaximizedBoxIndex={setMaximizedBoxIndex}
            items={items}
          />
        ))}
      </div>
      <Tooltip placement="top" title={"Khôi phục mục ẩn"}>
        <Space className="absolute top-0 right-5 mt-[10px]">
          <Switch loading={loading} checked={show} onClick={() => onShow()} />
          <Badge
            count={show ? hiddenBoxes.length : 0}
            showZero
            color="#faad14"
          />
          <>Test git</>
        </Space>
      </Tooltip>
    </DndProvider>
  );
};
