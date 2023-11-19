const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((item) => item.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newBook = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  data.push(newBook);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newBook;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
