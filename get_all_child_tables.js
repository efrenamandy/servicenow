//Only works in Global
var taskTables = new TableUtils('task').getAllExtensions();
gs.include("j2js");
taskTables = j2js(taskTables);

//For Scoped
new GlideTableHierarchy('task').getAllExtensions();
