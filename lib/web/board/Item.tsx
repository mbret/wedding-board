import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useMeasure } from "react-use";
import { useRecoilValue } from "recoil";
import { MessageItem } from "./items/MessageItem";
import { PhotoItem } from "./items/PhotoItem";
import { activeItemsState } from "./state";
import { useRandomMessage } from "./useRandomMessage";

const ANIMATION_MINIMUM_DURATION = 1000;
const MAX_WAITING_TIME = 5000;
const MIN_DISPLAY_TIME = 2000;
const MAX_DISPLAY_TIME = 15000;

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const animations = [
  `animate__heartBeat`,
  `animate__pulse`,
  `animate__tada`,
  `animate__rubberBand`,
];

export const Item = memo(() => {
  const [visible, setVisible] = useState(false);
  const { message, clear, reset } = useRandomMessage();
  const [hasActiveMessage, setHasActiveMessage] = useState(!!message);
  const [opacity, setOpacity] = useState(0);
  const [ref, { height: maxHeight }] = useMeasure();
  const rotate = useMemo(
    () => getRandomNumberBetween(-10, 10),
    [hasActiveMessage]
  );
  const [itemRef, { height }] = useMeasure();
  const [itemLoaded, setItemLoaded] = useState(false);
  const transform =
    height > maxHeight ? `scale(${maxHeight / height})` : undefined;
  const enterAnimationClassName = useMemo(
    () =>
      opacity === 1
        ? `animate__animated ${
            animations[getRandomNumberBetween(0, animations.length - 1)]
          }`
        : `animate__animated animate__zoomOut`,
    [opacity]
  );

  const onItemLoad = useCallback(() => {
    setItemLoaded(true);
  }, []);

  useEffect(() => {
    const durationBeforeNextSwitch = visible
      ? getRandomNumberBetween(MIN_DISPLAY_TIME, MAX_DISPLAY_TIME)
      : getRandomNumberBetween(ANIMATION_MINIMUM_DURATION, MAX_WAITING_TIME);
    if (visible) {
      setHasActiveMessage(false);
    }
    const timer = setTimeout(() => {
      setVisible((value) => !value);
    }, durationBeforeNextSwitch);

    return () => clearTimeout(timer);
  }, [visible]);

  /**
   * When the item is not visible anymore we wait for the end of animation
   * and release the message so it can be picked up by other item
   */
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        clear();
      }, ANIMATION_MINIMUM_DURATION);

      return () => clearTimeout(timer);
    }
  }, [visible, clear]);

  useEffect(() => {
    if (visible && !hasActiveMessage) {
      setHasActiveMessage(true);
      reset();
    } else if (!visible) {
      setItemLoaded(false);
    }
  }, [visible, hasActiveMessage, reset]);

  /**
   * Update opacity whenever the item is loaded / unload
   * we have to use a big delay to avoid transform glitch
   */
  useEffect(() => {
    if (itemLoaded) {
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [itemLoaded]);

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
        className={enterAnimationClassName}
        style={{
          maxWidth: `80%`,
          width: `80%`,
          height: `85%`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          opacity,
        }}
      >
        <div
          ref={itemRef as any}
          style={{
            transform,
          }}
        >
          {hasActiveMessage && (
            <>
              {!!message?.file && (
                <PhotoItem onLoad={onItemLoad} {...message} />
              )}
              {!!message?.message && !message?.file && (
                <MessageItem onLoad={onItemLoad} {...message} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

Item.displayName = `Item`;
