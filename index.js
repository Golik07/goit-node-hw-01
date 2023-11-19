const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./db/contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("--action, <type>")
  .option("--id, <type>")
  .option("--name, <type>")
  .option("--email, <type>")
  .option("--phone, <type>");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);
    case "get":
      const oneBook = await getContactById(id);
      return console.log(oneBook);
    case "add":
      const newBook = await addContact(name, email, phone);
      return console.log(newBook);
    case "remove":
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "123-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Golik",
//   email: "werty@gmail.com",
//   phone: "123123123",
// });

// invokeAction({ action: "remove", id: "mQ4N7vzX-ZnK4zdt4vjGb" });
