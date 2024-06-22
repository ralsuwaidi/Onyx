// TaskListInputRule.ts
import { textblockTypeInputRule } from "@tiptap/core";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const taskInputRegex = /(?:^|\s)- \[\] $/;

const TaskItemExtension = TaskItem.extend({
  addExtensions() {
    return [TaskList, TaskItem];
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: taskInputRegex,
        type: this.editor.schema.nodes.taskItem,
        getAttributes: () => ({}),
      }),
    ];
  },
});

export default TaskItemExtension;
