// BulletToTaskExtension.ts
import { textblockTypeInputRule } from "@tiptap/core";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

const taskInputRegex = /(?:^|\s)- \[\] $/;

const BulletListExtension = BulletList.extend({
  addExtensions() {
    return [TaskList, TaskItem, ListItem, BulletList];
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: taskInputRegex,
        type: this.editor.schema.nodes.taskItem,
        getAttributes: () => ({ checked: false }),
      }),
    ];
  },
});

export default BulletListExtension;
