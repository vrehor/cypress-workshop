import { Constructable, Container, ContainerInstance } from 'typedi';

import ServiceContainer from '../helpers/ServiceContainer';

import * as AllServices from './index';

type ServiceName = keyof typeof AllServices;
export type ServiceRegistry = {
  [key in ServiceName]: InstanceType<(typeof AllServices)[key]>;
} & { instance: () => ContainerInstance };

const proxy = {};

class ServiceNotFound extends Error {
  name = 'ServiceNotFound';
}

const scopedServiceRegistry = ((id: string) => {
  const containerInstance = ServiceContainer.getOrCreateInstance(id);

  return new Proxy(proxy, {
    get: (_, serviceName) => {
      if (serviceName === 'instance') return () => containerInstance;

      if (serviceName in AllServices) {
        return containerInstance.get(
          AllServices[
            serviceName as keyof typeof AllServices
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as Constructable<any>
        );
      }

      throw new ServiceNotFound(
        `Service ${serviceName.toString()} not found.\nAvailable services list: \n${Object.keys(
          AllServices
        ).join('\n- ')}\n`
      );
    },
  });
}) as (id: string) => ServiceRegistry & { instance: () => ContainerInstance };

export const TEST = 'TEST';
export default scopedServiceRegistry;

export const dispose = (requestId: string) => {
  const instanceIndex = Container['instances'].findIndex(
    (instance: { id: string }) => instance.id === requestId
  );
  if (instanceIndex > -1) {
    Container['instances'][instanceIndex].reset();
    Container['instances'].splice(instanceIndex, 1);
  }
};
