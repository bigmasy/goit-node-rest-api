import Contact from "../db/models/Contact.js";

export const listContacts = async () => {
  try {
    return await Contact.findAll();
  } catch (error) {
    return [];
  }
};
export const getContactById = async (id) => {
  const result = await Contact.findByPk(id);
  return result || null;
};

export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

export const updateContactById = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateContactStatusById = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};
