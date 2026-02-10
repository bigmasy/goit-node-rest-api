import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await contactsService.addContact(name, email, phone);

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const contact = await contactsService.updateContactById(id, data);
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};
