import { useEffect } from "react";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

export const useKeyboardSetup = () => {
  useEffect(() => {
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.setScroll({ isDisabled: true });
    Keyboard.setResizeMode({ mode: KeyboardResize.Native }); // Set resize mode to none
  }, []);
};
