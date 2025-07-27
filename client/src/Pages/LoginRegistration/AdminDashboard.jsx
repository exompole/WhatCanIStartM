import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:5000/api/admin/users"
        );
        const contactRes = await axios.get(
          "http://localhost:5000/api/admin/contacts"
        );
        setUsers(userRes.data);
        setContacts(contactRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div >
      <h1>Admin Dashboard</h1>

      <section >
        <h2>Total Users: {users.length}</h2>
        <ul>
          {users.map((user, idx) => (
            <li key={idx}>
              {user.firstname} {user.surname} ({user.email})
            </li>
          ))}
        </ul>
      </section>

      <section >
        <h2>Contact Submissions: {contacts.length}</h2>
        <ul>
          {contacts.map((c, idx) => (
            <li key={idx}>
              <strong>{c.name}</strong>: {c.message} ({c.email})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
