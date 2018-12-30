const router = require('express').Router()
const Users = require('./../models/users')
const _ = require('lodash')

// GET USERS
router.get('/', (req, res) => {
  Users.getAll()
  .then(users => {
    res.format({
      html: () => {
        res.render('users', {
          title: 'GET USERS',
          request: 'GET ' + req.originalUrl,
          users: users 
        })
      },
      json: () => {
        res.json({users: users})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// GET FORM TO ADD A USER
router.get('/add', (req, res) => {
  res.format({
    html: () => {
      res.render('add_user', {
        title: 'ADD USER'
      })
    }
  })
})

// GET A TODO
router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.findOne(req.params.id)
  .then((todo) => {
    res.format({
      html: () => {
        res.render('todo', {
          title: 'GET TODO',
          request: 'GET ' + req.originalUrl,
          todo: todo
        })
      },
      json: () => {
        res.json({todo: todo})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// GET FORM TO UPDATE A TODO
router.get('/:id/edit', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.findOne(req.params.id)
  .then((todo) => {
    res.format({
      html: () => {
        res.render('edit', {
          title: 'EDIT TODO',
          todo: todo
        })
      },
      json: () => {
        res.json({todo: todo})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// POST A TODO
router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.name || !req.body.completion || !req.body.userId))) 
  return res.status(404).send('NOT FOUND')

  Todos.create(req.body)
  .then((todo) => {
    res.format({
      html: () => {
        res.redirect(301, '/')
      },
      json: () => {
        res.json({message: 'success'})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// UPDATE A TODO
router.put('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date() // Update time
  req.body.id = req.params.id // Add id to body
  Todos.update(req.body)
  .then((todo) => 
    res.format({
      html: () => {
        res.redirect(301, '/')
      },
      json: () => {
        res.json({message: 'success'})
      }
    })
  )
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// DELETE A TODO
router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.delete(req.params.id).then(() => {
    res.format({
      html: () => {
        res.redirect(301, '/')
      },
      json: () => {
        res.json({message: 'success'})
      }
    })
  }).catch((err) => {
    return res.status(404).send(err)
  })
})


// GET TODOS OF USER
router.get('/:id/todos', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')

  Users.getTodos(req.params.id)
  .then(todos => {
    res.format({
      html: () => {
        res.render('todos', {
          title: 'GET TODOS',
          request: 'GET ' + req.originalUrl,
          todos: todos 
        })
      },
      json: () => {
        res.json({todos: todos})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.all('/', (req, res, next) => {
  res.redirect(301, '/')
})
router.get('*', (req, res, next) => {
  res.redirect(301, '/')
})

module.exports = router