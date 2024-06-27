'use client';

import React from 'react';
import UserBadge from '@/pages/UserBadge';
import { User } from "@/types/object";
import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";


export default function BadgePage () {
  const { user } = useUser();

  if(!user)return<Loading loading={!(!user)}/>

  return <UserBadge user={user} />;
};

