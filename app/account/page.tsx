'use client';
import { useEffect, useState } from 'react';
import { getAccountDetails } from '@/app/api/accountApi';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';

interface Account {
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  avatar: {
    gravatar: { hash: string } | null;
    tmdb: { avatar_path: string | null } | null;
  };
}

export default function AccountPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await getAccountDetails(21890670);
      const path = res.data.avatar?.tmdb?.avatar_path;
      if (path) {
        setAvatar(`https://image.tmdb.org/t/p/w200${path}`);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccountDetails(21890670);
        setAccount(res.data);
      } catch (err) {
        console.error('Error fetching account details:', err);
      }
    };
    fetchAccount();
  }, []);

  return (
    <>
      <Navbar avatarUrl={avatar} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">👤 Account Details</h1>
        {account ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {account.avatar?.tmdb?.avatar_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${account.avatar.tmdb.avatar_path}`}
                  width={500}
                  height={750}
                  alt={account.username}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{account.username}</h2>
                <p className="text-gray-600">Name: {account.name || 'N/A'}</p>
                <p className="text-gray-600">Adult: {account.include_adult ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
