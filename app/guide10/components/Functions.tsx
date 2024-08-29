import React, { useState, useEffect } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { TerminalOutput } from "@/components/ui/terminal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface Contact {
  name: string;
  email: string;
  phoneNumber?: string;
  company?: string;
}

class ContactList {
  private contacts: Contact[] = [];

  constructor(initialContacts: Contact[]) {
    this.contacts = initialContacts;
  }

  add(contact: Contact): string {
    if (!contact.name || !contact.email) {
      return "Missing fields";
    }
    if (this.contacts.some((c) => c.email === contact.email)) {
      return "Duplicate was found";
    }
    this.contacts.push(contact);
    return `${contact.name} was added`;
  }

  remove(email: string): string {
    const index = this.contacts.findIndex((c) => c.email === email);
    if (index === -1) {
      return "Contact not found";
    }
    const removed = this.contacts.splice(index, 1)[0];
    return `${removed.name} was removed`;
  }

  listAll(): string {
    if (this.contacts.length === 0) {
      return "No contacts found";
    }
    return this.contacts
      .map(
        (c) =>
          `Name: ${c.name}\nEmail: ${c.email}\nPhone number: ${
            c.phoneNumber || "N/A"
          }\nCompany: ${c.company || "N/A"}`
      )
      .join("\n\n");
  }

  clear(): string {
    this.contacts = [];
    return "The contact list was cleared";
  }

  search(query: string): string {
    const results = this.contacts.filter((c) =>
      Object.values(c).some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
    if (results.length === 0) {
      return "No contacts found";
    }
    return results
      .map(
        (c) =>
          `Name: ${c.name}\nEmail: ${c.email}\nPhone number: ${
            c.phoneNumber || "N/A"
          }\nCompany: ${c.company || "N/A"}`
      )
      .join("\n\n");
  }
}

const dummyContacts: Contact[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "1234567",
    company: "ABC Corp",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "2345678",
    company: "XYZ Inc",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "3456789",
    company: "123 LLC",
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    phoneNumber: "4567890",
    company: "456 Co",
  },
];

const Functions: React.FC = () => {
  const { toast } = useToast();
  const [contactList, setContactList] = useState(
    () => new ContactList(dummyContacts)
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    setContactList(new ContactList(dummyContacts));
  }, []);

  const showResult = (operation: string, result: string) => {
    const formattedResult = result.replace(/\n/g, "<br>");

    toast({
      title: operation,
      description: (
        <div
          className="max-h-[60vh] overflow-y-auto pr-4"
          style={{ scrollbarWidth: "thin" }}
        >
          <TerminalOutput
            command={`console.log(${operation})`}
            output={formattedResult}
          />
        </div>
      ),
      duration: 15000, // 15 seconds
      className:
        "bg-gray-900 border-gray-800 text-white w-[400px] max-w-[90vw]",
    });
  };

  const handleAction =
    (action: () => string, actionName: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const result = action();
      showResult(actionName, result);
    };

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const query = name || email || phoneNumber || company;
    const result = contactList.search(query);
    showResult("Search Contacts", result);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = contactList.clear();
    setContactList(new ContactList([]));
    showResult("Clear Contacts", result);
  };

  const codeExample = `
interface Contact {
  name: string;
  email: string;
  phoneNumber?: string;
  company?: string;
}

class ContactList {
  private contacts: Contact[] = [];

  add(contact: Contact): string {
    if (!contact.name || !contact.email) {
      return "Missing fields";
    }
    if (this.contacts.some(c => c.email === contact.email)) {
      return "Duplicate was found";
    }
    this.contacts.push(contact);
    return \`\${contact.name} was added\`;
  }

  remove(email: string): string {
    const index = this.contacts.findIndex(c => c.email === email);
    if (index === -1) {
      return "Contact not found";
    }
    const removed = this.contacts.splice(index, 1)[0];
    return \`\${removed.name} was removed\`;
  }

  listAll(): string {
    return this.contacts.map(c => \`\${c.name} \${c.email}\`).join(", ");
  }

  clear(): string {
    this.contacts = [];
    return "The contact list was cleared";
  }

  search(query: string): string {
    const results = this.contacts.filter(c => 
      Object.values(c).some(value => 
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
    if (results.length === 0) {
      return "No contacts found";
    }
    return results.map(c => this.get(c.email)).join("\\n");
  }
}
  `.trim();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Contact List Functions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>View TypeScript Code</AccordionTrigger>
          <AccordionContent>
            <CodeBlock
              text={codeExample}
              language="typescript"
              showLineNumbers={true}
              theme={atomOneDark}
              customStyle={{
                borderRadius: "5px",
                boxShadow: "1px 4px 4px rgba(0,0,0,0.5)",
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Phone Number (7 digits)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.slice(0, 7))}
          maxLength={7}
        />
        <Input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={handleAction(
            () => contactList.add({ name, email, phoneNumber, company }),
            "Add Contact"
          )}
        >
          Add Contact
        </Button>
        <Button
          onClick={handleAction(
            () => contactList.remove(email),
            "Remove Contact"
          )}
        >
          Remove Contact
        </Button>
        <Button
          onClick={handleAction(
            () => contactList.listAll(),
            "List All Contacts"
          )}
        >
          List All Contacts
        </Button>
        <Button onClick={handleSearch}>Search Contacts</Button>
        <Button onClick={handleClear}>Clear Contacts</Button>
      </div>
      <Separator />
      <div className="flex items-start space-x-4 mt-4">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/108062355?v=4&size=64" />
          <AvatarFallback>VB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2 w-3/5">
          <div className="relative bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
            <div className="absolute left-1 top-0.6 -ml-2 w-3 h-4 bg-blue-100 dark:bg-blue-900 rotate-45 transform origin-center"></div>
            <h4 className="text-sm font-semibold mb-2">@vikkiklikk</h4>
            <p className="text-sm">
              This TypeScript implementation of a contact list demonstrates key
              concepts such as interfaces, classes, and type safety. It
              showcases how to manage a collection of contacts with operations
              like add, remove, get, list all, and search. The component
              includes pre-populated dummy data and implements error handling as
              specified in the requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functions;
