import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import OrderedList from "@tiptap/extension-ordered-list";
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
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import LinkExtension from "@/editor/extensions/Link";
import {
  CustomEqualKeyExtension,
  HighlightMark,
} from "@/editor/extensions/Highlight";
import CodeEnclosing from "@/editor/extensions/CodeEnclosing";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import MarkdownPaste from "@/editor/extensions/MarkdownPaste";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { lowlight } from "lowlight";

const CustomDocument = Document.extend({
  content: "heading block*",
});

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("ts", ts);

const extensions = [
  Paragraph,
  Text,
  Bold,
  Code,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Italic,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "What's the title?";
      }

      return "Can you add some further context?";
    },
  }),
  ListItem,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Typography,
  Strike,
  Underline,
  Focus,
  HorizontalRule,
  Highlight,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  Dropcursor,
  OrderedList,
  TableCell,
  HardBreak,
  Heading.configure({
    levels: [1, 2, 3, 4, 5],
  }),

  // custom
  // BulletListExtension,
  BulletList,
  MarkdownPaste,
  CustomDocument,
  LinkExtension.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
  }),
  CodeEnclosing,
  HighlightMark,
  CustomEqualKeyExtension,
];

export default extensions;
