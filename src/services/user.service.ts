import { User } from '../models'
import dotenv from 'dotenv'

dotenv.config()
const bcrypt = require('bcrypt')

const saltRounds = process.env.BCRYPT_SALT_ROUNDS as string

export const createUser = async (name: string, email: string, password: string) => {
  const hasUser = await User.findOne({ where: { email } })
  let passwordHash = null

  if (!hasUser) {
    return bcrypt.hash(password, parseInt(saltRounds)).then(async (hash: string) => {
      passwordHash = hash
      if (passwordHash) {
        const newUser = await User.create({ name, email, password: passwordHash })
        return newUser
      }
    })
  } else {
    return false
  }
}

export const listAllUsers = async () => {
  const users = await User.findAll()
  const list: string[] = []

  for (let i in users) {
    list.push(users[i].email)
  }
  return list
}

export const getUser = async (id: number) => {
  const user = await User.findByPk(id)
  return user ?? false
}

export const updateUser = async (id: number, email: string, password: string) => {
  const user = await User.findByPk(id)
  if (user) {
    return bcrypt.hash(password, parseInt(saltRounds)).then(async (hash: string) => {
      user.email = email
      user.password = hash

      return await user.save()
    })
  }
}

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id)
  const numberDestroyedRows = await User.destroy({ where: { id } })
  if (numberDestroyedRows === 0) {
    return false
  }
  return user
}
