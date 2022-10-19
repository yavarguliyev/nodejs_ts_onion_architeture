import { Service } from 'typedi'

import { BaseRepository } from 'Data/Repositories/BaseRepository'
import Role from 'Core/Entities/Role'
import { IRoleRepository } from 'Core/Repositories/IRole.Repository'

@Service()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {}
