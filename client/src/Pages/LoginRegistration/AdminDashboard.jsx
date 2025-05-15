import { useEffect, useState } from "react";
import axios from "axios";
// import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await axios.get("http://localhost:5000/api/users");
      const contactsRes = await axios.get("http://localhost:5000/api/contacts");
      setUsers(usersRes.data);
      setContacts(contactsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Total Users: {users.length}</h2>

      <h3>Contact Form Submissions:</h3>
      <ul>
        {contacts.map((msg, idx) => (
          <li key={idx}>
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
