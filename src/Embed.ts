import { Message, MessageEmbed } from 'discord.js'

import { CustomEmbedOptions } from './typings/Embed'

export class Embed extends MessageEmbed {
  public msg: Message

  public colors: {
    red: string
    green: string
    blue: string
    yellow: string
    orange: string
    white: string
    black: string
    grey: string
  }

  public customImage: string

  public constructor(msg: Message = null, options?: CustomEmbedOptions) {
    super()

    this.msg = msg
    this.colors = {
      red: '#FB5744',
      green: '#83AA9B',
      blue: '#4E4EF0',
      yellow: '#EFC461',
      orange: '#EFC461',
      white: '#C5C8C6',
      black: '#1D1F21',
      grey: '#7A838C'
    }

    if (!options) options = {}
    if (!options.color) options.color = this.colors.green
    if (!options.showAuthor) options.showAuthor = true

    if (options.color) {
      this.setColor(this.colors[options.color.toLowerCase()] ? this.colors[options.color.toLowerCase()] : options.color)
    }

    if (msg && options.showAuthor) {
      this.setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL({ size: 1024, dynamic: true }))
    }

    if (options.image) {
      this.customImage = `https://subby.dev/i/icons/${options.image}`
      this.setThumbnail(`https://subby.dev/i/icons/${options.image}`)
    }
    this.setTimestamp(new Date())
  }
}
