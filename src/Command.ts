import { Message, PermissionString } from 'discord.js'

import { CommandData, CommandUsage } from './typings/Command'

export class Command {
  public _name: string

  public description: string

  public aliases: string[]

  public argumentRequired: boolean

  public isGuildOnly: boolean

  public isOwnerOnly: boolean

  public permsNeeded: PermissionString[]

  public isEnabled: boolean

  public requiredRole: string

  public isShownInHelp: boolean

  public isDmOnly: boolean

  public usage: CommandUsage[]

  public category: string

  public location: string

  public cooldown: number

  public image?: string

  public constructor(data: CommandData) {
    this._name = data._name
    this.description = data.description
    this.category = data.category
    this.aliases = data.aliases || []
    this.argumentRequired = data.argumentRequired === true
    this.usage = data.usage || []
    this.isGuildOnly = data.isGuildOnly !== false
    this.isOwnerOnly = data.isOwnerOnly === true
    this.permsNeeded = data.permsNeeded || ['SEND_MESSAGES']
    this.isEnabled = data.isEnabled !== false
    this.requiredRole = data.requiredRole || ''
    this.isShownInHelp = data.isShownInHelp !== false
    this.isDmOnly = data.isDmOnly === true
    this.cooldown = data.cooldown || 2

    if (this.isDmOnly) {
      this.isGuildOnly = false
    }
    if (this.isGuildOnly) {
      this.isDmOnly = false
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public async run(msg: Message, args: string[]): Promise<any> {}
}
