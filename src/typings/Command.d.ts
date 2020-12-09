import { PermissionString } from 'discord.js'

interface CommandData {
  cooldown?: number
  _name: string
  aliases?: string[]
  argumentRequired?: boolean
  category: string
  description: string
  isDmOnly?: boolean
  isEnabled?: boolean
  isGuildOnly?: boolean
  isOwnerOnly?: boolean
  isShownInHelp?: boolean
  permsNeeded?: PermissionString[]
  requiredRole?: string
  usage?: CommandUsage[]
}

export interface CommandUsage {
  description: string
  usage: string
}
