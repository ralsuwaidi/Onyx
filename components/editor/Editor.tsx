import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import "./editor.css";
import extensions from "./extensions";
import { useKeyboardSetup, useEditorTitleUpdate } from "./hooks";
import EditorToolbar from "./extension/EditorToolbar";
import FloatingMenu from "./extension/FloatingMenu";
import BubbleMenu from "./extension/BubbleMenu";
import { saveEditorContent, loadEditorContent } from "./preferences";

interface EditorProps {
  onTitleChange: (title: string) => void;
}

const Editor = ({ onTitleChange }: EditorProps) => {
  const [headerHeight, setHeaderHeight] = useState(120); // Adjust header height as needed
  const [isAtTop, setIsAtTop] = useState(false);

  useKeyboardSetup();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert py-4 px-2 leading-normal sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions,
    content: "", // Initialize with empty content
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      saveEditorContent(JSON.stringify(json)); // Save content to Capacitor Preferences
    },
  });

  useEditorTitleUpdate(editor, onTitleChange);

  useEffect(() => {
    const loadContent = async () => {
      const savedContent = await loadEditorContent();
      if (editor && savedContent) {
        editor.commands.setContent(JSON.parse(savedContent));
      }
    };

    loadContent();
  }, [editor]);

  const setLink = (): any => {
    const url = prompt("Enter the URL");
    if (url) {
      editor!.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <article
      className={`h-screen ${
        headerHeight === 120
          ? "max-h-[calc(100vh-200px)]"
          : "max-h-[calc(100vh-180px)]"
      }`}
      onClick={() => editor?.commands.focus()}
    >
      <div
        className="overscroll-contain overflow-auto h-full "
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div id="top-marker" className="h-1"></div>
        <div className="mx-2">
          {isAtTop && <EditorToolbar editor={editor} setLink={setLink} />}
          {editor && <BubbleMenu editor={editor} setLink={setLink} />}
          {editor && <FloatingMenu editor={editor} />}

          <EditorContent editor={editor} />
        </div>
      </div>
    </article>
  );
};

export default Editor;
