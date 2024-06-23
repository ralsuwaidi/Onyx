import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import "@/styles/editor.css";
import extensions from "../editor/configs/extensionsConfig";
import { useKeyboardSetup } from "@/hooks/useKeyboardSetup";
import { useEditorTitleUpdate } from "@/hooks/useEditorTitleUpdate";
import { loadEditorContent, saveEditorContent } from "@/hooks/utils";
import BubbleMenu from "@/editor/extensions/BubbleMenu";
import FloatingMenu from "@/editor/extensions/FloatingMenu";

interface EditorProps {
  onTitleChange: (title: string) => void;
}

const Editor = ({ onTitleChange }: EditorProps) => {
  const [headerHeight, setHeaderHeight] = useState(120);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useKeyboardSetup();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert py-4 px-2 leading-normal sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions,
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      saveEditorContent(JSON.stringify(json));
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

  const handleFocus = () => {
    if (editor && editor.view) {
      const { state, view } = editor;
      const { from } = state.selection;
      const startCoords = view.coordsAtPos(from);
      const container = editorContainerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset = startCoords.top - containerRect.top - 100;
        container.scrollTop += offset;
      }
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
        ref={editorContainerRef}
        className="overscroll-contain overflow-auto h-full"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div id="top-marker" className="h-1"></div>
        <div className="mx-2 mb-64">
          {editor && <BubbleMenu editor={editor} setLink={setLink} />}
          {editor && <FloatingMenu editor={editor} />}
          <EditorContent editor={editor} onFocus={handleFocus} />
        </div>
      </div>
    </article>
  );
};

export default Editor;
