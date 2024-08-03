import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { DashOutlined, SmallDashOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "BOX";

interface BoxProps {
  src: string;
  index: number;
  moveBox: (dragIndex: number, hoverIndex: number) => void;
  maximizedBoxIndex: number | null;
  setMaximizedBoxIndex: React.Dispatch<React.SetStateAction<number | null>>;
  items: (
    imageIndex: number
  ) => { key: string; label: string; onClick: () => void }[];
}

export const Box: React.FC<BoxProps> = ({
  src,
  index,
  moveBox,
  maximizedBoxIndex,
  setMaximizedBoxIndex,
  items,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
    },
    drop(item: { index: number }) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveBox(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      key={index}
      className={`rounded-[20px]  cursor-pointer box relative overflow-hidden ${
        maximizedBoxIndex === index
          ? "fixed top-0 left-0 w-full h-full z-50"
          : "w-full h-full"
      } duration-75`}
      style={{
        display:
          maximizedBoxIndex === null || maximizedBoxIndex === index
            ? "block"
            : "none",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img
        src={src}
        alt=""
        className={`w-full h-full  ${
          maximizedBoxIndex === index ? "" : "h"
        }`}
      />
      <Dropdown
        className="absolute top-0 right-3"
        overlay={
          <Menu items={items(index)} selectable defaultSelectedKeys={["3"]} />
        }
      >
        <Typography.Link>
          <Space>
            <DashOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </div>
  );
};
