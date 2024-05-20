import React, { useEffect, useState, useRef } from "react";

export const ButtonScroll: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const viewHeightRef = useRef<number>(0);
  const viewDisplayHeightRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const handleClick = () => setIsScrolling((prev) => !prev);

  useEffect(() => {
    const handleAutoScroll = () => {
      const view = document.querySelector(".ag-body-viewport");

      if (!view) return;

      viewHeightRef.current = view.scrollHeight;
      viewDisplayHeightRef.current = view.clientHeight;

      if (viewHeightRef.current - viewDisplayHeightRef.current < 18) return;

      let position = view.scrollTop;
      let direction: "down" | "up" = "down";

      intervalRef.current = setInterval(() => {
        if (direction === "up" && position <= 0) {
          direction = "down";
        } else if (
          direction === "down" &&
          position + viewDisplayHeightRef.current >= viewHeightRef.current
        ) {
          direction = "up";
        }

        position += direction === "up" ? -1 : 1;

        view.scrollTo(0, position);
      }, 5);

      const onUserScroll = () => (position = view.scrollTop);
      view.addEventListener("scroll", onUserScroll);

      return () => {
        clearInterval(intervalRef.current!);
        view.removeEventListener("scroll", onUserScroll);
      };
    };

    if (isScrolling) {
      handleAutoScroll();
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isScrolling]);

  useEffect(() => {
    const handleOnShowHideIndex = () => setIsScrolling(false);

    const handleResize = () => {
      const view = document.querySelector(".ag-body-viewport");

      if (!view) return;

      viewDisplayHeightRef.current = view?.clientHeight ?? 0;
      viewHeightRef.current = view?.scrollHeight ?? 0;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="rect auto-scrolling h-6 w-6 rounded flex items-center justify-center"
      onClick={handleClick}
    >
      <img
        className="h-4 w-4"
        src={`/assets/icon/dark/icon-${isScrolling ? "pause" : "play"}.svg`}
      />
    </div>
  );
};
