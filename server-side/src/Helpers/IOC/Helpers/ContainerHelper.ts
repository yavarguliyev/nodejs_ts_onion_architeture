import { Container, Constructable } from 'typedi'

import { ContainerHelperDictionary } from 'Helpers/IOC/Types/ContainerHelperDictionary'

export class ContainerHelper {
  private static dict: ContainerHelperDictionary = { }

  public static addSingleton<TI>(id: string, type: Constructable<TI>) {
    this.dict[id] = { value: type, injectionVersion: 'singleton' }
    Container.set({ id, type, global: true })
    return ContainerHelper
  }

  public static addScoped<TI>(id: string, type: Constructable<TI>) {
    this.dict[id] = { value: type, injectionVersion: 'scoped' }
    Container.set({ id, type, global: false, transient: false })
    return ContainerHelper
  }

  public static addTransient<TI>(id: string, type: Constructable<TI>) {
    this.dict[id] = { value: type, injectionVersion: 'transient' }
    Container.set({ id, type, transient: true })
    return ContainerHelper
  }

  public static get<TI>(id: string): TI {
    return Container.get<TI>(id)
  }

  public static getConstructor<TI = unknown>(id: string): Constructable<TI> {
    const _type = this.dict[id].value as Constructable<TI>
    return _type
  }
}
