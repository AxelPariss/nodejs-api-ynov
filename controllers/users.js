const router = require('express').Router()
const Users = require('./../models/users')
const moment = require('moment')
const _ = require('lodash')

// GET USERS
router.get('/', (req, res) => {
  Users.getAll()
  .then(users => {
    console.log(users)
    res.format({
      html: () => {
        res.render('users', {
          title: 'GET USERS',
          request: 'GET ' + req.originalUrl,
          users: users,
          moment: moment
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

// GET A USER
router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.findOne(req.params.id)
  .then((user) => {
    res.format({
      html: () => {
        res.render('user', {
          title: 'GET USER',
          request: 'GET ' + req.originalUrl,
          user: user,
          moment: moment
        })
      },
      json: () => {
        res.json({user: user})
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
  Users.findOne(req.params.id)
  .then((user) => {
    res.format({
      html: () => {
        res.render('add_user', {
          title: 'EDIT USER',
          user: user
        })
      },
      json: () => {
        res.json({user: user})
      }
    })
  })
  .catch((err) => {
    return res.status(404).send(err)
  })
})

// POST A USER
router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password || !req.body.email))) 
  return res.status(404).send('NOT FOUND')

  Users.create(req.body)
  .then((user) => {
    res.format({
      html: () => {
        res.redirect(301, '/users')
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

// UPDATE A USER
router.put('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updatedAt = new Date() // Update time
  req.body.userId = req.params.id // Add id to body
  Users.update(req.body)
  .then((user) => 
    res.format({
      html: () => {
        res.redirect(301, '/users')
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

// DELETE A USER
router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.delete(req.params.id).then(() => {
    res.format({
      html: () => {
        res.redirect(301, '/todos')
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