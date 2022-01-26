import validator from 'validator'
import { Request, Response } from 'express'
import { createUser, listAllUsers, getUser, deleteUser, updateUser } from '../services'

export const signIn = async (req: Request, res: Response) => {
  res.json({ status: true, user: req.user })
}

export const signUp = async (req: Request, res: Response) => {
  if (req.body.name && validator.isEmail(req.body.email) && req.body.password) {
    let { name, email, password } = req.body

    let newUser = await createUser(name, email, password)
    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      })
    } else {
      res.json({ error: 'E-mail já existe.' })
    }
  } else {
    res.json({ error: 'Nome, e-mail e/ou senha não enviados.' })
  }
}

export const list = async (req: Request, res: Response) => {
  const list = await listAllUsers()
  if (list.length > 0) {
    res.json(list)
  } else {
    res.status(404).json({ error: 'Nenhum registro encontrado.' })
  }
}

export const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (!isNaN(id)) {
    const user = await getUser(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: `Usuário de ID ${id} não encontrado.` })
    }
  }
}

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (!isNaN(id)) {
    if (validator.isEmail(req.body.email) && req.body.password) {
      const user = await updateUser(id, req.body.email, req.body.password)
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: `Usuário de ID ${id} não encontrado.` })
      }
    } else {
      res.json({ error: 'E-mail e/ou senha não enviados.' })
    }
  }
}

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (!isNaN(id)) {
    const user = await deleteUser(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: `Usuário de ID ${id} não encontrado.` })
    }
  }
}
