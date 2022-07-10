import Image from "next/image";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { truncate } from "../truncate";
import { useRandomMessage } from "./useRandomMessage";

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const animations = [
  `animate__heartBeat`,
  `animate__pulse`,
  `animate__tada`,
  `animate__rubberBand`,
];

const ImageMessage = memo(
  ({
    name,
    file,
    message,
    maxHeight,
  }: {
    name: string;
    file?: string;
    message?: string;
    maxHeight: number;
  }) => {
    const [ref, { height }] = useMeasure();
    const element = useRef<HTMLDivElement | undefined>(undefined);
    const transform =
      height > maxHeight ? `scale(${maxHeight / height})` : undefined;

    // I hate this !!!
    useEffect(() => {
      if (element.current) {
        element.current.style.opacity = `0`;

        setTimeout(() => {
          if (element.current) {
            element.current.style.opacity = `1`;
          }
        }, 10);
      }
    }, [name, file, message, maxHeight]);

    if (!file) return null;

    return (
      <div
        ref={(_ref: any) => {
          ref(_ref) as any;
          element.current = _ref ?? undefined;
        }}
        style={{
          border: `5px solid white`,
          backgroundColor: `white`,
          borderRadius: `3%`,
          transform,
        }}
      >
        <picture>
          <img src={file} alt={file} />
        </picture>
        <div
          style={{
            marginTop: 5,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          {!!message && truncate(message, 100)}
          <div
            style={{
              ...(message && {
                marginTop: 8,
              }),
              textAlign: `right`,
            }}
          >
            {name}
          </div>
        </div>
      </div>
    );
  }
);

ImageMessage.displayName = `ImageMessage`;

const TextMessage = memo(
  ({
    name,
    message,
    maxHeight,
  }: {
    name: string;
    message?: string;
    maxHeight: number;
  }) => {
    const [ref, { height }] = useMeasure();
    const element = useRef<HTMLDivElement | undefined>(undefined);

    // I hate this !!!
    useEffect(() => {
      if (element.current) {
        element.current.style.opacity = `0`;

        setTimeout(() => {
          if (element.current) {
            element.current.style.opacity = `1`;
          }
        }, 10);
      }
    }, [name, message, maxHeight]);

    if (!message) return null;

    return (
      <div
        ref={(_ref: any) => {
          ref(_ref) as any;
          element.current = _ref ?? undefined;
        }}
        style={{
          width: `100%`,
          border: `5px solid white`,
          backgroundColor: `white`,
          borderRadius: `5px`,
          padding: 5,
          ...(height > maxHeight && {
            transform: `scale(${maxHeight / height})`,
          }),
        }}
      >
        {message}
        <div
          style={{
            ...(message && {
              marginTop: 8,
            }),
            textAlign: `right`,
          }}
        >
          {name}
        </div>
      </div>
    );
  }
);

TextMessage.displayName = `TextMessage`;

export const Item = memo(() => {
  const { message, visible } = useRandomMessage();
  const [ref, { height }] = useMeasure();
  const rotate = useMemo(() => getRandomNumberBetween(-5, 5), [message]);
  const className = useMemo(
    () =>
      visible
        ? `animate__animated ${
            animations[getRandomNumberBetween(0, animations.length - 1)]
          }`
        : `animate__animated animate__zoomOut`,
    [visible]
  );

  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        boxSizing: `border-box`,
        position: `relative`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        ref={ref as any}
        className={className}
        style={{
          maxWidth: `80%`,
          width: `80%`,
          height: `85%`,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        {!!message?.file && <ImageMessage maxHeight={height} {...message} />}
        {!!message?.message && !message?.file && (
          <TextMessage maxHeight={height} {...message} />
        )}
      </div>
    </div>
  );
});

Item.displayName = `Item`;
