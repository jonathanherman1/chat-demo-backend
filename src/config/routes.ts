import type { Application } from "express"
import * as routes from '../routes'

/**
 * Sets up all the routes in the application.
 * 
 * @param app - The Express application instance.
 */
export const setupRoutes = (app: Application) => {
  Object.values(routes).forEach((route) => {
    app.use(route)
  })
}
