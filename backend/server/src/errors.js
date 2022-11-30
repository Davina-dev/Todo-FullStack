const config = require('./config');

class TodosApiError extends Error {
  constructor(code, message) {
    super();
    this.name = "TodosApiError";
    this.code = code;
    this.message = message;
  }
}


// Es Función de alto ordenes (func. que config. a otras func.).
//Es un configurador de rutas, lo que hace esa ruta se lo pasa como parámetro
const catchErrors = (routeHandler) => async (req, res, next, ...args) => {
    try {
      await routeHandler(req, res, next, ...args);
    } catch (err) {
      next(err); //pasa al siguiente middleware de la cadena
    }
  };

const errorHandler = (err, req, res, next) => {
  if (err.name === "TodosApiError") {
    const { code, message } = err;
    return res.status(code).send({ error: message });
  }
  res.status(500).send({
    error: config.isDevelopment ? `Internal Server Error: ${err}` : `Internal Error`,
  });
};

const errMalformed = (message) => {
  throw new TodosApiError(400, `Bad request: ${message}`);
};

const errUnauthorized = (message) => {
  throw new TodosApiError(401, message);
};

module.exports = {
  TodosApiError,
  catchErrors,
  errorHandler,
  errMalformed,
  errUnauthorized,
};
