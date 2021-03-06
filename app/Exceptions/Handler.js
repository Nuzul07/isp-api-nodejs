'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    return response.status(error.status).send(error.message)
    // if(error.status == 404) {
    //   response.json({
    //     status: false,
    //     message: "404 Not Found"
    //   })
    // }else if(error.status == 401) {
    //   response.json({
    //     status: false,
    //     message: "Unauthorized"
    //   })
    // }else if(error.status == 500) {
    //   response.json({
    //     status: false,
    //     message: "Internal Server Error"
    //   })
    // }else if(error.status == 400) {
    //   response.json({
    //     status: false,
    //     message: "Bad Request"
    //   })
    // }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
