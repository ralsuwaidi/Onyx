import { useEffect, useState } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
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
import { Keyboard } from "@capacitor/keyboard";
import "./Editor.css";
import ButtonGroup from "../common/ButtonGroup";
import CustomLink from "./CustomLink";
import {
  CustomEqualKeyExtension,
  HighlightMark,
} from "./CustomEqualSignExtension";

const Editor = () => {
  useEffect(() => {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      Keyboard.setAccessoryBarVisible({ isVisible: true });
    }
  }, []);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert leading-normal sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      TaskList,
      Bold,
      Code,
      Italic,
      ListItem,
      CustomLink,
      Typography,
      Strike,
      CustomEqualKeyExtension,
      Underline,
      Focus,
      HighlightMark,
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
      TaskItem.configure({
        nested: true,
      }),
      HardBreak,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "Hello World! 🌎️",
  });

  const setLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor!.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div
      className="transition-all duration-300"
      onClick={() => editor?.commands.focus()}
    >
      {editor && (
        <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
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
                label: "Strike",
                onClick: () => editor.chain().focus().toggleStrike().run(),
                active: editor.isActive("strike"),
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
  );
};

export default Editor;
