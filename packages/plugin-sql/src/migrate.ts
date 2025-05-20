import { logger, stringToUuid } from '@elizaos/core';
import { config } from 'dotenv';
import { PGliteClientManager } from './pglite/manager.js';
import { PostgresConnectionManager } from './pg/manager.js';
import os from 'node:os';
import path from 'node:path';

config({ path: '../../.env' });

/**
 * Executes database migrations using either PostgreSQL or PGlite, depending on environment configuration.
 *
 * If the `POSTGRES_URL` environment variable is set, migrations are run against the specified PostgreSQL database. Otherwise, migrations are run using a PGlite database, with the data directory determined by the `PGLITE_DATA_DIR` environment variable or a project-specific default path.
 *
 * @remark This function terminates the Node.js process upon completion or failure.
 */
async function runMigrations() {
  if (process.env.POSTGRES_URL) {
    try {
      const connectionManager = new PostgresConnectionManager(process.env.POSTGRES_URL);
      await connectionManager.initialize();
      await connectionManager.runMigrations();
      // await connectionManager.close();
      logger.success('PostgreSQL migrations completed successfully');
      process.exit(0);
    } catch (error) {
      logger.warn('PostgreSQL migration failed:', error);
      process.exit(1);
    }
  } else {
    const elizaDbDir = process.env.PGLITE_DATA_DIR ?? path.join(process.cwd(), '.pglite');

    if (!process.env.PGLITE_DATA_DIR) {
      logger.info(`PGLITE_DATA_DIR not set, defaulting to project path: ${elizaDbDir}`);
    } else {
      logger.info(`Using PGLITE_DATA_DIR: ${elizaDbDir}`);
    }

    logger.info('Using PGlite database at:', elizaDbDir);
    const clientManager = new PGliteClientManager({
      dataDir: elizaDbDir,
    });

    try {
      await clientManager.initialize();
      await clientManager.runMigrations();
      logger.success('PGlite migrations completed successfully');
      await clientManager.close();
      process.exit(0);
    } catch (error) {
      logger.error('PGlite migration failed:', error);
      try {
        await clientManager.close();
      } catch (closeError) {
        logger.error('Failed to close PGlite connection:', closeError);
      }
      process.exit(1);
    }
  }
}

runMigrations().catch((error) => {
  logger.error('Unhandled error in migrations:', error);
  process.exit(1);
});
