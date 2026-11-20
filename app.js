import { createTask, toggleTask, deleteTask, filterTasks, taskCounts, isValidTask } from './core.mjs';

const STORAGE_KEY = 'focusboard-lite:v1';
const form = document.querySelector('#taskForm');
const list = document.querySelector('#taskList');
const empty = document.querySelector('#emptyState');
const titleInput = document.querySelector('#taskTitle');
const priorityInput = document.querySelector('#taskPriority');
const searchInput = document.querySelector('#taskSearch');
const clearDone = document.querySelector('#clearDone');
const errorBox = document.querySelector('#formError');
const storageNote = document.querySelector('#storageNote');
let tasks = [];
let filter = 'all';

function loadTasks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(isValidTask).slice(0,1000) : [];
  } catch { return []; }
}
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
    storageNote.textContent = 'Los datos se guardan solo en este navegador.';
  } catch {
    storageNote.textContent = 'El navegador bloqueó el almacenamiento. Las tareas se perderán al recargar.';
  }
}
function priorityLabel(priority) {return ({high:'Alta',medium:'Media',low:'Baja'})[priority] || 'Media';}
function makeNode(tag,className,text) {
  const node = document.createElement(tag);
  if(className) node.className = className;
  if(text !== undefined) node.textContent = text; // Avoid interpreting task names as HTML.
  return node;
}
function render() {
  const visible = filterTasks(tasks,filter,searchInput.value);
  list.replaceChildren();
  for(const task of visible) {
    const li = makeNode('li','task-row'+(task.completed?' completed':''));
    const check = makeNode('input','task-check');
    check.type = 'checkbox';check.checked = task.completed;
    check.setAttribute('aria-label',`Marcar como ${task.completed ? 'pendiente' : 'completada'}: ${task.title}`);
    check.addEventListener('change',()=>{tasks=toggleTask(tasks,task.id);saveTasks();render();});
    const body = makeNode('div','task-body');
    body.append(makeNode('div','task-title',task.title));
    const date = new Date(task.createdAt);
    const formatted = Number.isNaN(date.valueOf()) ? '' : date.toLocaleDateString('es-CO',{year:'numeric',month:'short',day:'numeric'});
    body.append(makeNode('div','task-date',formatted));
    const priority = makeNode('span',`priority priority-${task.priority}`,priorityLabel(task.priority));
    const del = makeNode('button','delete','×');
    del.type='button';del.title = `Eliminar: ${task.title}`;del.setAttribute('aria-label',del.title);
    del.addEventListener('click',()=>{tasks=deleteTask(tasks,task.id);saveTasks();render();});
    li.append(check,body,priority,del);
    list.append(li);
  }
  empty.hidden = visible.length > 0;
  const counts=taskCounts(tasks);
  document.querySelector('#pendingCount').textContent=`${counts.pending} pendientes`;
  document.querySelector('#doneCount').textContent=`${counts.done} completadas`;
  clearDone.disabled=counts.done===0;
}
form.addEventListener('submit',event=>{
  event.preventDefault();errorBox.hidden=true;
  try {
    if(tasks.length>=1000) throw new Error('Máximo de 1000 tareas. Elimina algunas para continuar.');
    tasks = [createTask(titleInput.value,priorityInput.value),...tasks];
    titleInput.value='';priorityInput.value='medium';
    saveTasks();render();titleInput.focus();
  } catch (error) {
    errorBox.textContent = error.message === 'Title must be 1-100 characters' ? 'Escribe una tarea de 1 a 100 caracteres.' : error.message;
    errorBox.hidden = false;
  }
});
searchInput.addEventListener('input',render);
for (const button of document.querySelectorAll('[data-filter]')) {
  button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    for (const b of document.querySelectorAll('[data-filter]')) {
      const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));
    }
    render();
  });
}
clearDone.addEventListener('click',()=>{tasks=tasks.filter(task=>!task.completed);saveTasks();render();});
tasks=loadTasks();render();
