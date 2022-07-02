import Redis from 'ioredis';
import configs from '../configs';

/**
 * Classe Singleton
 */
export default class RedisCli {
  private static instance: RedisCli;
  public static getInstance(): RedisCli {
    if (!RedisCli.instance) {
      RedisCli.instance = new RedisCli();
    }
    return RedisCli.instance;
  }

  private redis: Redis;

  /**
   * Colocamos como protected para impedir a instância via new
   */
  private constructor() {
    this.redis = new Redis(configs.redis);
  }

  async getJSON(key: string) {
    const redisKey = await this.redis.get(key);
    if (redisKey) {
      return JSON.parse(redisKey);
    }
    return undefined;
  }

  async setJSON(key: string, value) {
    await this.redis.set(key, JSON.stringify(value));
  }
}
