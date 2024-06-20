import { useEffect, useState } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";
import "./Editor.css";
import ButtonGroup from "../common/ButtonGroup";
import CustomLink from "./CustomLink";
import {
  CustomEqualKeyExtension,
  HighlightMark,
} from "./CustomEqualSignExtension";
import CodeEnclosingExtension from "./CodeEnclosingExtension";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BulletToTaskExtension from "./BulletToTaskExtension";
import classNames from "classnames";

const Editor = () => {
  const [headerHeight, setHeaderHeight] = useState(100); // Adjust header height as needed

  useEffect(() => {
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.setScroll({ isDisabled: true });
    Keyboard.setResizeMode({ mode: KeyboardResize.Native }); // Set resize mode to none

    const handleResize = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set height

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert py-4 pl-4 leading-normal sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      BulletToTaskExtension,
      Bold,
      Code,
      Italic,
      ListItem,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Typography,
      Strike,
      Underline,
      Focus,
      Highlight,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      Dropcursor,
      OrderedList,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      TableCell,
      HardBreak,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),

      // custom
      CustomLink,
      CodeEnclosingExtension,
      HighlightMark,
      CustomEqualKeyExtension,
    ],
    content: "",
  });

  const setLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor!.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <article
      className={classNames("h-screen", {
        "max-h-[calc(100vh-80px)]": headerHeight === 100, // Default value if headerHeight is 100
        "max-h-[calc(100vh-16px)]": headerHeight !== 100, // Assuming some other default height, you can adjust this as needed
      })}
      onClick={() => editor?.commands.focus()}
    >
      <div
        className="overscroll-contain overflow-auto h-full "
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {editor && (
          <BubbleMenu tippyOptions={{ duration: 0 }} editor={editor}>
            <ButtonGroup
              size="md"
              variant="default"
              buttons={[
                {
                  label: "Bold",
                  onClick: () => editor.chain().focus().toggleBold().run(),
                  active: editor.isActive("bold"),
                },
                {
                  label: "Italic",
                  onClick: () => editor.chain().focus().toggleItalic().run(),
                  active: editor.isActive("italic"),
                },
                {
                  label: "Link",
                  onClick: setLink,
                  active: editor.isActive("link"),
                },
              ]}
            />
          </BubbleMenu>
        )}

        <EditorContent editor={editor} />
      </div>
    </article>
  );
};

export default Editor;
