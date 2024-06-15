import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { markInputRule } from "@tiptap/core";

const linkInputRegex = /\[(.*?)\]\((.*?)\)$/;

const CustomLink = TiptapLink.extend({
  addInputRules() {
    return [
      markInputRule({
        find: linkInputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [_, text, href] = match;
          return { href };
        },
      }),
    ];
  },
});

export default CustomLink;
