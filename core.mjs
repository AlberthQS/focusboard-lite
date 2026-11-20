// Pure task data functions. No DOM or browser APIs are needed here.
const VALID_PRIORITIES = new Set(["low", "medium", "high"]);
const MAX_TITLE_LENGTH = 100;

export function createTask(title, priority = "medium", id = crypto.randomUUID(), now = new Date().toISOString()) {
  if (typeof title !== "string") throw new TypeError("Title must be a string");
  const clean = title.trim();
  if (!clean || clean.length > MAX_TITLE_LENGTH) throw new RangeError("Title must be 1-100 characters");
  if (!VALID_PRIORITIES.has(priority)) throw new RangeError("Invalid priority");
  if (typeof id !== "string" || !id) throw new TypeError("Invalid ID");
  return { id, title: clean, priority, completed: false, createdAt: now };
}

export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
}

export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

export function filterTasks(tasks, filter = "all", term = "") {
  const q = term.trim().toLocaleLowerCase("es");
  return tasks.filter(task =>
    (filter === "all" || (filter === "active" && !task.completed) || (filter === "done" && task.completed)) &&
    task.title.toLocaleLowerCase("es").includes(q)
  );
}

export function taskCounts(tasks) {
  const done = tasks.filter(t => t.completed).length;
  return { pending: tasks.length - done, done };
}

export function isValidTask(task) {
  return !!task && typeof task === "object" && typeof task.id === "string" && task.id.length > 0 &&
    typeof task.title === "string" && task.title.trim().length > 0 && task.title.length <= MAX_TITLE_LENGTH &&
    VALID_PRIORITIES.has(task.priority) && typeof task.completed === "boolean" &&
    typeof task.createdAt === "string";
}
