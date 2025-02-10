import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";

const PostTime = ({ date }) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <p className="text-gray-500 text-xs mt-1">
      <ClockCircleOutlined className="mr-2 text-blue-800" />{timeAgo}
    </p>
  );
};

export default PostTime;
