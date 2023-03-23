import Container from 'typedi';

const DISPOSE_SERVICES_AUTOMATICALLY_AFTER_TIME = 60 * 1000; // 1 minute

class ServiceContainer {
  createdServicesAt = new Map<string, number>();

  getOrCreateInstance(requestId: string) {
    if (!this.createdServicesAt.has(requestId)) {
      this.createdServicesAt.set(requestId, Date.now());
    }
    return Container.of(requestId);
  }

  dispose(requestId: string) {
    const instanceIndex = Container['instances'].findIndex(
      (instance: { id: string }) => instance.id === requestId
    );
    if (instanceIndex > -1) {
      Container['instances'][instanceIndex].reset();
      Container['instances'].splice(instanceIndex, 1);
    }
    this.createdServicesAt.delete(requestId);
  }

  checkAndDisposeOldServices() {
    const now = Date.now();
    this.createdServicesAt.forEach((createdAt, requestId) => {
      if (now - createdAt > DISPOSE_SERVICES_AUTOMATICALLY_AFTER_TIME) {
        this.dispose(requestId);
      }
    });
  }
}

export default new ServiceContainer();
