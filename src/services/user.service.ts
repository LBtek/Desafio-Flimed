import { User } from '../models'
import dotenv from 'dotenv'

dotenv.config()
const bcrypt = require('bcrypt')

export const createUser = async (name: string, email: string, password: string) => {
  const hasUser = await User.findOne({ where: { email } })
  let passwordHash = null

  if (!hasUser) {
    bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS, function (err: Error | undefined, hash: string) {
      passwordHash = hash
    })
    if (passwordHash) {
      const newUser = await User.create({ name, email, passwordHash })
      return newUser
    }
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
  const user = User.findByPk(id)
  return user ?? false
}

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id)
  const numberDestroyedRows = await User.destroy({ where: { id } })
  if (numberDestroyedRows === 0) {
    return false
  }
  return user
}
