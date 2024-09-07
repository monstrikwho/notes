export class ApiError extends Error {
  constructor(status, message, data) {
    super();

    if (!status || !message) {
      throw new Error('Status code and message are required.');
    }

    this.error = {
      data,
      status,
      message,
    };
  }
}
