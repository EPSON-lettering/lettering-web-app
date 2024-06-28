import React from 'react';
import {MyBadge, User} from "@/types/object";
import Typo from "@/components/common/Typo";
import NoneProfile from "@/components/common/NoneProfile";
import {default as UserBadgeComp} from "@/components/common/UserBadge";

interface UserBadgeProps {
  user: User;
  myBadges: MyBadge[];
}

const UserBadge: React.FC<UserBadgeProps> = ({user, myBadges = []}) => {
  return (
    <div className="PageLayout">
      <article className="box flex items-start my-8">
        <section className="w-full flex items-start">
          {!user?.profileImageUrl && <NoneProfile color={user.noneProfileColor} className="p-2 "/>}
          {user?.profileImageUrl && <img src={user.profileImageUrl}/>}
          <nav className="col-center pl-4">
            <Typo bold size="19">{user.nickname}</Typo>
            <Typo color="yellow" size="13" bold>LV. {user.level}</Typo>
          </nav>
        </section>
      </article>
      <article className="box pt-10 flex flex-col divide-y mb-8">
        {
          myBadges.map((badge) => <UserBadgeComp key={badge.id} badge={badge}/>)
        }
      </article>
    </div>
  )
}

export default UserBadge;