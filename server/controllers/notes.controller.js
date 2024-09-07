import Service from '#services/notes';
import { serviceInvoker } from '#utils/index';

class Notes {
  list = async (req, res) => {
    await serviceInvoker(req, res, Service.list, Service._service);
  };

  create = async (req, res) => {
    await serviceInvoker(req, res, Service.create, Service._service);
  };

  clear = async (req, res) => {
    await serviceInvoker(req, res, Service.clear, Service._service);
  };
}

export default new Notes();
