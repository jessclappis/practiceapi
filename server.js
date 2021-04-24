//npm init to create pacakge.json
//npm i -D nodemon to create package lock
const http = require('http')
const Todo =  require('./controller')
const { getPostData } = require('./utils');


const server = http.createServer(async (req,res)=>{
  if(req.url === '/api/todos' && req.method === 'GET'){
    const todos = await Todo.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(todos))
  }
  else if(req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) && req.method === 'GET'){
    try{
      const id = req.url.split('/')[3]
      const todos = await Todo.findById(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(todos))
    }
    catch(error){
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: error}));
		}
  }
  else if (req.url === '/api/todos' && req.method === 'POST') {
		const body = await getPostData(req);
		const { title, description } = JSON.parse(body);
		const newTodo = await Todo.create({ title, description });
		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(newTodo));
	}
  else if(req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) && req.method === 'PUT'){
    try{
      const body = await getPostData(req);
      const id = req.url.split('/')[3]
      const updatedTodo = await Todo.updateById(id, JSON.parse(body));
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(updatedTodo));
		} catch (error) {
			console.log(error);
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Todo not found!' }));
		}
  }
  else if(req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) && req.method === 'DELETE'){
    try{
      const id = req.url.split('/')[3]
      await Todo.deleteById(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(todos))
    }
    catch(error){
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error}));
    }
  }
  else {
  res.writeHead(404,{'Content-Type' : 'application/json'})
  res.end(JSON.stringify({message: 'Route Not Found'}))
  }
})

const PORT = process.env.PORT || 500
server.listen(PORT, () => console.log('Server listening on '+PORT))
