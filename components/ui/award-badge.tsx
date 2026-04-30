import React, { MouseEvent, useEffect, useRef, useState } from "react";

type AwardBadgeType = "industry-favorites" | "golden-kitty" | "product-of-the-day" | "product-of-the-month" | "product-of-the-week";

interface AwardBadgeProps {
  type: AwardBadgeType;
  place?: number;
  link?: string;
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.03;
const minRotate = -0.03;
const maxScale = 1;
const minScale = 0.98;

const backgroundColor = ["#E8E0D5", "#E5E5E5", "#EAD5C5"];

const title = {
  "industry-favorites": "Industry Favorites",
  "golden-kitty": "Golden Kitty Awards",
  "product-of-the-day": "Product of the Day",
  "product-of-the-month": "Product of the Month",
  "product-of-the-week": "Product of the Week",
};

export const AwardBadge = ({ type, place, link }: AwardBadgeProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState<number>(0);
  const [matrix, setMatrix] = useState<string>(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState<string>(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState<boolean>(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState<boolean>(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState<boolean>(false);
  const enterTimeout = useRef<NodeJS.Timeout>(null);
  const moveTimeout = useRef<NodeJS.Timeout>(null);
  const leaveTimeout1 = useRef<NodeJS.Timeout>(null);
  const leaveTimeout2 = useRef<NodeJS.Timeout>(null);
  const leaveTimeout3 = useRef<NodeJS.Timeout>(null);

  const getDimensions = () => {
    const rect = ref?.current?.getBoundingClientRect();
    if (!rect) return { left: 0, right: 0, top: 0, bottom: 0 };
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top)
    ];

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: (0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom)),
      z3: 0
    };
    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`;
  };

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;

    return _matrix.split(", ").map((item, index) => {
      if (index === 2 || index === 4 || index === 8) {
        return -parseFloat(item) * multiplier / weakening;
      } else if (index === 0 || index === 5 || index === 10) {
        return "1";
      } else if (index === 6) {
        return multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
      } else if (index === 9) {
        return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
      }
      return item;
    }).join(", ");
  };

  const onMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (leaveTimeout1.current) {
      clearTimeout(leaveTimeout1.current);
    }
    if (leaveTimeout2.current) {
      clearTimeout(leaveTimeout2.current);
    }
    if (leaveTimeout3.current) {
      clearTimeout(leaveTimeout3.current);
    }
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 4);
      });
    });

    const matrix = getMatrix(e.clientX, e.clientY);
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY, true);

    setMatrix(oppositeMatrix);
    setIsTimeoutFinished(false);
    setTimeout(() => {
      setIsTimeoutFinished(true)
    }, 200);
  };

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    if (moveTimeout.current) {
      clearTimeout(moveTimeout.current);
    }
    moveTimeout.current = setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 4), 350);

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const onMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);

    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const overlayAnimations = [...Array(10).keys()].map((e) => (
    `
    @keyframes overlayAnimation${e + 1} {
      0% {
        transform: rotate(${e * 10}deg);
      }
      50% {
        transform: rotate(${(e + 1) * 10}deg);
      }
      100% {
        transform: rotate(${e * 10}deg);
      }
    }
    `
  )).join(" ");

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      className="block w-[180px] sm:w-[260px] h-auto cursor-pointer"
      style={{ contain: 'layout style' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <style>
        {overlayAnimations}
      </style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 700ms ease-out"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-180px sm:w-260px h-auto">
          <defs>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="badgeMask">
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>
          <rect width="260" height="54" rx="10" fill={type === "industry-favorites" ? backgroundColor[0] : (backgroundColor[(place || 2) - 1] || backgroundColor[1])} />
          <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke="rgba(106, 93, 85, 0.15)" strokeWidth="1" />
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill="#6A5D55" x="53" y="20">
            STUDIO 24
          </text>
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="16" fontWeight="bold" fill="#6A5D55" x="52" y="40">
            {title[type]}{place && ` ${place}`}
          </text>
          <g transform="translate(13, 11) scale(1.3)">
            <path fill="#6A5D55" d="M16.956 2.057c.355.124.829.375 1.303.796a3.77 3.77 0 0 1 1.246 2.204c.173.989-.047 1.894-.519 2.683l-.123.194q-.097.147-.196.272q.066.234.117.471q.26-.178.545-.307c.851-.389 1.727-.442 2.527-.306q.226.04.346.076a1 1 0 0 1 .689.712l.029.13q.015.08.03.18a4.45 4.45 0 0 1-.324 2.496a3.94 3.94 0 0 1-1.71 1.85l-.242.12a4.23 4.23 0 0 1-2.234.349A9 9 0 0 1 17.997 15c.37.016.748.093 1.128.24c.732.28 1.299.758 1.711 1.367a3.95 3.95 0 0 1 .654 1.613a1 1 0 0 1-.356.917a3.8 3.8 0 0 1-.716.443c-.933.455-1.978.588-3.043.179l-.032-.015l-.205-.086a3.6 3.6 0 0 1-1.33-1.069l-.143-.197a4 4 0 0 1-.26-.433a6 6 0 0 1-.927.511q.18.262.337.56a7.4 7.4 0 0 1 .66 1.747a1 1 0 0 1-1.95.444l-.028-.11a6 6 0 0 0-.449-1.143C12.706 19.323 12.338 19 12 19s-.706.323-1.048.969a5.6 5.6 0 0 0-.367.874l-.082.269l-.028.11a1 1 0 0 1-1.95-.444a7.3 7.3 0 0 1 .66-1.747q.158-.298.337-.561a6.4 6.4 0 0 1-.93-.508a4 4 0 0 1-.256.43c-.366.541-.855.98-1.473 1.267l-.238.1c-.994.382-1.97.292-2.855-.091l-.188-.087a3.8 3.8 0 0 1-.716-.443a1 1 0 0 1-.356-.917a3.95 3.95 0 0 1 .654-1.613a3.6 3.6 0 0 1 1.71-1.368c.38-.146.758-.223 1.13-.24a9 9 0 0 1-.445-1.023a4.23 4.23 0 0 1-2.233-.348a4 4 0 0 1-.916-.587l-.207-.191a4 4 0 0 1-.724-.977l-.105-.216a4.45 4.45 0 0 1-.265-2.806a1 1 0 0 1 .69-.712q.119-.036.345-.076c.801-.135 1.678-.082 2.53.308q.283.129.545.304q.048-.235.112-.47a5 5 0 0 1-.194-.272c-.556-.832-.83-1.806-.642-2.877l.05-.242a3.75 3.75 0 0 1 1.027-1.803l.169-.159a4 4 0 0 1 1.303-.796a1 1 0 0 1 .975.178c.2.168.462.446.719.83c.556.833.83 1.807.642 2.878a3.77 3.77 0 0 1-1.246 2.204c-.303.27-.607.47-.879.61A7.5 7.5 0 0 0 7 10.728C7 14.23 9.285 17 12 17s5-2.77 5-6.276a7.6 7.6 0 0 0-.253-1.967a4.3 4.3 0 0 1-.881-.61a3.77 3.77 0 0 1-1.246-2.204c-.188-1.07.086-2.045.642-2.877c.257-.385.52-.663.72-.831a1 1 0 0 1 .974-.178" />
          </g>
          <g style={{ mixBlendMode: "overlay" }} mask="url(#badgeMask)">
            <g style={{
              transform: `rotate(${firstOverlayPosition}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation1 5s infinite",
              willChange: "auto"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(358, 100%, 62%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 10}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation2 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(30, 100%, 50%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 20}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation3 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(60, 100%, 50%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 30}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation4 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(96, 100%, 50%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 40}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation5 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(233, 85%, 47%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 50}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation6 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(271, 85%, 47%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 60}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation7 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="hsl(300, 20%, 35%)" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 70}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation8 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="transparent" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 80}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation9 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="transparent" filter="url(#blur1)" opacity="0.5" />
            </g>
            <g style={{
              transform: `rotate(${firstOverlayPosition + 90}deg)`,
              transformOrigin: "center center",
              transition: !disableInOutOverlayAnimation ? "transform 500ms ease-out" : "none",
              animation: disableOverlayAnimation ? "none" : "overlayAnimation10 5s infinite",
              willChange: "transform"
            }}>
              <polygon points="0,0 260,54 260,0 0,54" fill="white" filter="url(#blur1)" opacity="0.5" />
            </g>
          </g>
        </svg>
      </div>
    </a>
  );
};
