'use client';

import React from 'react';
import UserBadge from '@/pages/UserBadge';
import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import useUserBadges from "@/hooks/useUserBadges";


export default function BadgePage() {
  const {user} = useUser();
  const {userBadges, partnerBadges, myBadges, loading} = useUserBadges();
  if (!user || loading || !userBadges) return <Loading loading={!(!user || !userBadges)}/>

  return (
    <div className="Scroller">
      <UserBadge user={user} myBadges={myBadges}/>
    </div>
  );
};

