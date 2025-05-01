'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading all users... ⏳</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Users</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/users/${user.id}`}>
              <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                {user.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
