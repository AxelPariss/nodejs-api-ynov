const router = require('express').Router()
const Todos = require('./../models/todos')
const _ = require('lodash')
const moment = require('moment')



// GET TODOS
router.get('/', (req, res) => {
  Todos.getAll()
  .then(todos => {
    res.format({
      html: () => {
        res.render('todos', {
          title: 'GET TODOS',
          request: 'GET ' + req.originalUrl,
          todos: todos,
          moment: moment
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

// GET FORM TO ADD A TODO
router.get('/add', (req, res) => {
  res.format({
    html: () => {
      res.render('add_todo', {
        title: 'ADD TODO'
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
          todo: todo,
          moment: moment
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
        res.render('add_todo', {
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
        res.redirect(301, '/todos')
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

router.all('/', (req, res, next) => {
  res.redirect(301, '/')
})
router.get('*', (req, res, next) => {
  res.format({
    html: () => {
      res.render('404')
    },
    json: () => {
      res.status(404).send()
    }
  })
})

module.exports = router