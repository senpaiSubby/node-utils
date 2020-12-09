import { GuildMember, Message, PermissionString } from 'discord.js'
import { CustomEmbedOptions } from 'typings/utils'

import { FAC_ID, SUBBY_ID } from '../../CONSTANTS'
import { Command } from '../Command'
import { Embed } from './Embed'
import { emojis } from './utils'

/**
 * Checks the specified roles for the given guild member
 */
export const checkRoles = (member: GuildMember, rolesNeeded: string[]): string[] =>
  rolesNeeded.filter((role) => {
    const hasRole = member.roles.cache.find((r) => r.id === role || r.name.toLowerCase() === role.toLowerCase())
    if (!hasRole) {
      return role
    }
  })

/**
 * Checks if a member has the specified permissions in the guild
 */
export const checkPerms = (member: GuildMember, permsNeeded: PermissionString[]): PermissionString[] =>
  permsNeeded.filter((perm) => {
    if (member.id !== SUBBY_ID && member.id !== FAC_ID) {
      if (!member.permissions.has(perm)) {
        return perm
      }
    }
  })

export const errorMessage = (msg: Message, text: string, options: CustomEmbedOptions = { color: 'red' }) => {
  if (!options.color) options.color = 'red'

  const e = new Embed(msg, options).setDescription(`${emojis(msg)[404]} ${text}`)

  if (options.autoRemove) {
    const { time } = options.autoRemove

    if (options.autoRemove.both) {
      return msg.channel.send(e).then((m) => {
        m.delete({ timeout: time }).catch()
        msg.delete({ timeout: time }).catch()
      })
    }
    return msg.channel.send(e).then((m) => m.delete({ timeout: time }).catch())
  }

  return msg.channel.send(e)
}

export const warningMessage = (msg: Message, text: string, options: CustomEmbedOptions = { color: 'yellow' }) => {
  if (!options.color) options.color = 'yellow'

  const e = new Embed(msg, options).setDescription(`${emojis(msg).warning} ${text}`)

  if (options.autoRemove) {
    const { time } = options.autoRemove

    if (options.autoRemove.both) {
      return msg.channel.send(e).then((m) => {
        m.delete({ timeout: time }).catch()
        msg.delete({ timeout: time }).catch()
      })
    }

    return msg.channel
      .send(e)
      .then((m) => m.delete({ timeout: time }))
      .catch()
  }

  return msg.channel.send(e)
}

export const standardMessage = (msg: Message, text: string, options: CustomEmbedOptions = { color: 'blue' }) => {
  if (!options.color) options.color = 'blue'

  const e = new Embed(msg, options).setDescription(text)

  if (options.autoRemove) {
    const { time } = options.autoRemove

    if (options.autoRemove.both) {
      return msg.channel.send(e).then((m) => {
        m.delete({ timeout: time }).catch()
        msg.delete({ timeout: time }).catch()
      })
    }

    return msg.channel
      .send(e)
      .then((m) => m.delete({ timeout: time }))
      .catch()
  }

  return msg.channel.send(e)
}

export const missingConfig = (msg: Message, name: string, params: string[]) =>
  msg.channel.send(
    new Embed(msg, { color: 'red', image: 'settings.png' }).setTitle(`Missing [ ${name} ] config!`).setDescription(
      `\`${msg.p}config get ${name}\` for current config.

          Set them like so..

          \`\`\`css\n${params.join('\n')}\n\`\`\``
    )
  )

// Standard valid options return
export const validUsage = async (msg: Message, command: Command) => {
  if (command.usage.length) {
    const e = new Embed(msg, { image: 'faq.png' })
      .setTitle(`${command._name} Help`)
      .setFooter('Message will self destruct in 60 seconds')
    //.setDescription(`**${command.description}**`)

    command.usage.forEach((u) => e.addField(u.description, `\`${msg.p}${command._name} ${u.usage}\``))

    if (command.image) {
      e.setThumbnail(`https://subby.dev/i/icons/${command.image}`)
      e.setFooter(`Message will self destruct in 60 seconds`, `https://subby.dev/i/icons/${command.image}`)
    }

    if (command._name === 'rl') {
      e.setImage('https://bss.nz/i/roulette.png')
    }

    return msg.channel.send(e).then((m) => {
      if (command._name === 'rl') {
        return m.delete({ timeout: 120000 })
      } else return m.delete({ timeout: 60000 })
    })
  }
}
