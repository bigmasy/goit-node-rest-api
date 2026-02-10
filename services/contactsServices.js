import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
export const getContactById = async (id) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === id);
  return result || null;
};

export const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
};

export const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
};

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};
