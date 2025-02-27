"use client"

import Image from 'next/image'
import React from 'react'

import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { FiTrash, FiArchive } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

import Subtitle from './subtitle';
import List from './list';
import { signOut } from 'next-auth/react';
import FolderType from '@/types/folder.type';
import Folders from './folders';
import PostType from '@/types/post.type';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  userId: string;
  folders: FolderType[];
  recents: PostType[];
  domain: string;
  logo: string;
}

const Sidebar = ({ folders, recents, userId, domain, logo }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId');
  const postId = searchParams.get('postId');
  const category = searchParams.get('category');

  const logoutHandler = () => {
    signOut();
  }

  const createNewNote = () => {
    if (folderId && postId) {
      router.push(`/?folderId=${folderId}&postId=${postId}&modal=open`);
    } else if (folderId) {
      router.push(`/?folderId=${folderId}&modal=open`);
    } else {
      router.push(`/?modal=open`);
    }
  }

  return (
    <nav className="min-w-300 max-w-300 bg-[#1b1b1b] h-screen py-30 flex flex-col gap-y-30 overflow-y-auto">
      {/* Logo & Search Buttonn */}
      <div className="px-20 flex items-center justify-between">
        {( logo ? 
        <Image
          src={logo}
          alt={domain}
          width={101}
          height={38}
          className="w-101 h-38"
        />  :
        <span>{domain}</span>
        )}
        <FiSearch className="w-20 h-20 text-white opacity-40 cursor-pointer" />
      </div>
      {/* New Note Button */}
      <div className="px-20">
        <button className="rounded-3 bg-white/5 text-white w-full h-40 p-20 flex items-center justify-center gap-x-8 font-sans font-semibold text-16" onClick={createNewNote}>
          <FaPlus className="w-20 h-20" />
          New Listing
        </button>
      </div>
      {/* Recents */}
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="Recents" />
        </div>
        <div className="flex flex-col gap-y-5">
          {recents.length ? recents.map(recent => (
            <List
              key={recent.id}
              folderId={recent.folderId}
              postId={recent.id}
              title={recent.title}
              icon={<FaRegFileAlt className="w-20 h-20 text-white" />}
              active={folderId === recent.folderId && postId === recent.id}
              activeColor={folderId === recent.folderId && postId === recent.id ? "bg-[#312EB5]" : ""}
            />
          )) : (
            <h3 className="subheading px-20">There are no recent posts</h3>
          )}
        </div>
      </div>
      
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="More" />
        </div>
        <div className="flex flex-col gap-y-5">
          <List
            title="Favorites"
            icon={<FaRegStar className="w-20 h-20 text-white" />}
            active={category === "favorites"}
            activeColor={category === "favorites" ? "bg-white/5" : ""}
          />
          <List
            title="Trash"
            icon={<FiTrash className="w-20 h-20 text-white" />}
            active={category === "trash"}
            activeColor={category === "trash" ? "bg-white/5" : ""}
          />
          <List
            title="Archived Notes"
            icon={<FiArchive className="w-20 h-20 text-white" />}
            active={category === "archived-notes"}
            activeColor={category === "archived-notes" ? "bg-white/5" : ""}
          />
        </div>
      </div>
      {/* Settings */}
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="Settings" />
        </div>
        <div className="flex flex-col gap-y-5">
          <div onClick={logoutHandler} className="py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition">
            <IoIosLogOut className="w-20 h-20 text-white" />
            <h3 className="font-sans text-16 font-semibold text-white">Logout</h3>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar