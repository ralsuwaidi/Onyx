import { useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";

export const useEditorTitleUpdate = (
  editor: any,
  onTitleChange: (title: string) => void
) => {
  const previousTitle = useRef("");

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

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        handleEditorUpdate(editor);
      });
    }
  }, [editor, handleEditorUpdate]);
};
