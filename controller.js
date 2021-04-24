const todos = require('./data');

/*const findAll = () => {
	return new Promise((resolve, reject) => {
		resolve(todos);
	});
};*/
//pull all data
function findAll(){
  return new Promise((resolve, reject) => {
    resolve(todos)
  })
}

/*const findById = (id) => {
	return new Promise((resolve, reject) => {
		const todo = todos.find((todo) => todo.id === id);
		if (todo) {
			resolve(todo);
		}
		else {
			reject(`Todo with id ${id} not found !`);
		}
	});
};*/
//find specific element
function findById(id){
  return new Promise((resolve,reject)=> {
    const todo = todos.find((todo) => todo.id === id);
    if(todo){
          resolve(todo)
    }
    else{
      reject('id '+id+' could not be found')
    }
  })
}


/*const deleteById = (id) => {
	return new Promise((resolve, reject) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		todos = [
			...newTodos
		];
		resolve({ message: 'Todo deleted successfully!!' });
	});
};*/
//delete specific element
function deleteById(id){
  return new Promise((resolve,reject)=>{
    todosRemove = todos.filter((p)=>p.oid !==id)
    writeDataToFile('data.js',todosRemove)
    resolve()
  })
}

/*const create = (todo) => {
	return new Promise((resolve, reject) => {
		const newTodo = {
			id : Date.now().toString(),
			...todo
		};
		todos = [
			newTodo,
			...todos
		];
		resolve(newTodo);
	});
};*/
//create new todo
function create(todo){
  return new Promise((resolve,reject)=>{
    const newTodo = {id:Date.now().toString(), ...todo}
    todos.push(newTodo)
    writeDataToFile('data.js',todos)
    resolve(todos)
  })
}

/*const updateById = async (id, body) => {
	try {
		const { title, description } = body;
		const todo = await findById(id);
		if (!todo) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Todo not found!' }));
		}
		return new Promise((resolve, reject) => {
			const updatedTodo = {
				id,
				title       :
					title ? title :
					todo.title,
				description :
					description ? description :
					todo.description
			};
			const index = todos.findIndex((todo) => todo.id === id);
			todos[index] = updatedTodo;
			resolve(updatedTodo);
		});
	} catch (error) {
		console.log(error);
	}
};*/
//update data
function updateById(id, todo){
  return new Promise((resolve,reject)=>{
    const index = todos.findIndex((p)=>p.oid===id)
    todos[index] = {id,...todo}
    writeDataToFile('data.js',todos)
    resolve(todos)
  })
}

module.exports = {
	findAll,
	findById,
	deleteById,
	create,
	updateById
};
