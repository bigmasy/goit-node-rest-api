import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: user_id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const where = { user_id };
  if (favorite !== undefined) {
    where.favorite = favorite === "true";
  }
  const limitNumber = Number(limit);
  const offset = (Number(page) - 1) * limitNumber;
  const { count, rows } = await contactsService.listContacts(where, {
    limit: limitNumber,
    offset,
  });
  res.json({
    total: count,
    page: Number(page),
    limit: limitNumber,
    contacts: rows,
  });
};

export const getOneContact = async (req, res) => {
  const { id: user_id } = req.user;

  const { id } = req.params;
  const contact = await contactsService.getContact({ id, user_id });

  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const deleteContact = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  const contact = await contactsService.removeContact({ id, user_id });
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const createContact = async (req, res) => {
  const { id: user_id } = req.user;
  const contact = await contactsService.addContact({ ...req.body, user_id });

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id: user_id } = req.user;

  const { id } = req.params;
  const data = req.body;
  const contact = await contactsService.updateContactById(
    {
      id,
      user_id,
    },
    data,
  );
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const updateStatusContact = async (req, res) => {
  const { id: user_id } = req.user;

  const { id } = req.params;
  const contact = await contactsService.updateContactStatusById(
    {
      id,
      user_id,
    },
    req.body,
  );
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};
