'use client';

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const newUser = await res.json();
      console.log(newUser);
      
      setUsers((prev) => [...prev, newUser]);
      setName('');
      setEmail('');
    } else {
      alert('Failed to create user');
    }
  }

  return (
    <main className="flex flex-col items-center p-8 space-y-8 text-slate-400">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <ul className="space-y-2">
  {users.map((user: User) => (
    <li key={user.id} className="p-4 bg-gray-100 rounded shadow">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </li>
  ))}
</ul>

      </div>
    </main>
  );
}
