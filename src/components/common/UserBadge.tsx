import Typo from "@/components/common/Typo";
import React from "react";
import {MyBadge} from "@/types/object";

interface UserBadgeProps {
  badge: MyBadge;
}

const calcPercent = (badge: MyBadge) => `${(badge.user?.progress || 0) / (badge.info?.required_count || 1) * 100}%`;

const UserBadge = ({badge}: UserBadgeProps) => {
  return <>
    <section className="flex py-5 gap-x-3.5">
      <img src={badge.icon}/>
      <div className="flex flex-col w-[75%]">
        <Typo>
          {badge.name}
        </Typo>
        <Typo color="gray2">
          {badge.description}
        </Typo>
        {
          badge.info && <>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{
                  width: calcPercent(badge)
                }}></div>
              </div>
              <Typo color="gray2" className="ml-2">
                {badge.user?.progress || 0}/{badge.info.required_count}
              </Typo>
            </div>
          </>
        }
      </div>
    </section>
  </>
}

export default UserBadge;