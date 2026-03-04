import Contact from "../db/models/Contact.js";

export const listContacts = async (where, { limit, offset }) => {
  return await Contact.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
};

export const getContact = async (where) => {
  const result = await Contact.findOne({ where });
  return result || null;
};

export const removeContact = async (where) => {
  const contact = await getContact(where);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

export const updateContactById = async (where, data) => {
  const contact = await getContact(where);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateContactStatusById = async (where, data) => {
  const contact = await getContact(where);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};
