"use client";

import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import { useEditor, EditorContent } from "@tiptap/react";
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
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
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
      Strike,
      Underline,
      Highlight,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
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
    content: "# Hello World! 🌎️",
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
