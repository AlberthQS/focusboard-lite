import test from 'node:test';
import assert from 'node:assert/strict';
import {createTask,toggleTask,deleteTask,filterTasks,taskCounts,isValidTask} from '../core.mjs';
const fixed = {id:'one',now:'2026-01-01T00:00:00.000Z'};
test('creates a trimmed task with the requested priority',()=>{
  assert.deepEqual(createTask('  Aprende SQL  ','high',fixed.id,fixed.now),{id:'one',title:'Aprende SQL',priority:'high',completed:false,createdAt:fixed.now});
});
test('rejects empty and too-long task titles',()=>{
  assert.throws(()=>createTask('   ','low','two',fixed.now));
  assert.throws(()=>createTask('x'.repeat(101),'low','two',fixed.now));
});
test('rejects invalid priorities',()=>assert.throws(()=>createTask('Task','urgent','three',fixed.now)));
test('toggle does not mutate original array',()=>{
  const source=[createTask('Study','low','four',fixed.now)];
  const changed=toggleTask(source,'four');
  assert.equal(changed[0].completed,true);assert.equal(source[0].completed,false);
});
test('delete removes only the selected task',()=>{
  const a=createTask('A','low','a',fixed.now),b=createTask('B','high','b',fixed.now);
  assert.deepEqual(deleteTask([a,b],'a'),[b]);
});
test('filters by state and case-insensitive text',()=>{
  const a=createTask('Práctica SQL','high','a',fixed.now),b={...createTask('Reading','medium','b',fixed.now),completed:true};
  assert.deepEqual(filterTasks([a,b],'active','sql'),[a]);
  assert.deepEqual(filterTasks([a,b],'done'),[b]);
});
test('counts completed and pending tasks',()=>{
  const tasks=[createTask('A','low','a',fixed.now),{...createTask('B','low','b',fixed.now),completed:true}];
  assert.deepEqual(taskCounts(tasks),{pending:1,done:1});
});
test('validates saved tasks',()=>{
  assert.equal(isValidTask(createTask('A','low','a',fixed.now)),true);
  assert.equal(isValidTask({...createTask('A','low','a',fixed.now),title:'<script>'.repeat(20)}),false);
});
