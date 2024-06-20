import { useEffect, useState, useCallback, useRef } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
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
import Placeholder from "@tiptap/extension-placeholder";
import debounce from "lodash.debounce";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

const CustomDocument = Document.extend({
  content: "heading block*",
});

interface EditorProps {
  onTitleChange: (title: string) => void;
}

const Editor = ({ onTitleChange }: EditorProps) => {
  const [headerHeight, setHeaderHeight] = useState(120); // Adjust header height as needed
  const previousTitle = useRef("");

  useEffect(() => {
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.setScroll({ isDisabled: true });
    Keyboard.setResizeMode({ mode: KeyboardResize.Native }); // Set resize mode to none
  }, []);

  const handleEditorUpdate = useCallback(
    debounce((editor: any) => {
      const content = editor.getJSON();
      const firstNode = content.content[0];
      if (firstNode.type === "heading") {
        const title = firstNode.content.map((n: any) => n.text).join("");
        if (title !== previousTitle.current) {
          previousTitle.current = title;
          onTitleChange(title);
        }
      }
    }, 300),
    [onTitleChange]
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert py-4 px-2 leading-normal sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions: [
      Paragraph,
      Text,
      BulletList,
      BulletToTaskExtension,
      Bold,
      Code,
      CodeBlock,
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
      CustomDocument,
      CustomLink,
      CodeEnclosingExtension,
      HighlightMark,
      CustomEqualKeyExtension,
    ],
    content: `
      <h1>
        Title
      </h1>
      <p>
        … if you pass a custom document. That's the beauty of having full control over the schema.
      </p>
    `,
    onUpdate: ({ editor }) => {
      handleEditorUpdate(editor);
    },
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
        "max-h-[calc(100vh-200px)]": headerHeight === 120,
        "max-h-[calc(100vh-180px)]": headerHeight !== 120, // Assuming some other default height, you can adjust this as needed
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
        {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 0 }}>
            <div className="floating-menu translate-y-[6.5rem] md:translate-y-14">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                H1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                H2
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                Bullet list
              </button>
            </div>
          </FloatingMenu>
        )}

        <EditorContent editor={editor} />
      </div>
    </article>
  );
};

export default Editor;
