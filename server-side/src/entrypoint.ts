import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import { config } from './Config/main';
import './Api/Controllers'
import { Application as ExpressApplication } from 'express';

import { repositoriesContainerModule } from './Helpers/Repositories/container';
import { servicesContainerModule } from './Helpers/Services/container';
import { unitOfWorkContainerModule } from './Helpers/UnitOfWork/container';
import { errorHandler } from './Api/Middlewares/ErrorHandler';

const { NODE_PORT, NODE_ENV } = config

const initialize = async () => { 
  const container = new Container();
  await container.loadAsync(repositoriesContainerModule);
  await container.loadAsync(servicesContainerModule);
  await container.loadAsync(unitOfWorkContainerModule);

  // API Server initialisation
  const server = new InversifyExpressServer(container);

  server.setConfig((app: ExpressApplication) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
  });

  server.setErrorConfig((app: ExpressApplication) => {
    app.use(errorHandler);
  });

  const apiServer = server.build();
  apiServer.listen(NODE_PORT, () =>
    console.log(
      `=== 🕵  Server️ running in ${NODE_ENV} mode on port http://localhost:${NODE_PORT} ===`,
    ),
  );

  return container;
};

export { initialize }