import React from 'react';
import {Letter, User} from "@/types/object";
import Typo from "@/components/common/Typo";
import NoneProfile from "@/components/common/NoneProfile";
import Badge1 from "@public/icon/badge1.svg"
import Badge2 from "@public/icon/badge2.svg"
import Badge3 from "@public/icon/badge3.svg"
import Badge4 from "@public/icon/badge4.svg"
import Badge5 from "@public/icon/badge5.svg"
interface UserBadgeProps {
  user: User;
}

const UserBadge:React.FC<UserBadgeProps> = ({user}) => {

  return (
    <div className="PageLayout">
      <article className="box flex items-start my-8">
        <section className="w-full flex items-start">
          {!user?.profileImageUrl && <NoneProfile className="p-2 "/>}
          {user?.profileImageUrl && <img src={user.profileImageUrl}/>}
          <nav className="col-center pl-4">
            <Typo bold size="19">{user.nickname}</Typo>
            <Typo color="yellow" size="13" bold>LV. {user.level}</Typo>
          </nav>
        </section>
      </article>

      <article className="box pt-10 flex flex-col divide-y mb-8">
        <section className="flex py-5 gap-x-3.5">
          <Badge1/>
          <div className="flex flex-col w-[75%]">
            <Typo>편지의 제왕</Typo>
            <Typo color="gray2">편지 보내기를 1회 달성하세요.</Typo>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full w-full"></div>
              </div>
              <Typo color="gray2" className="ml-2">
                1/1
              </Typo>
            </div>
          </div>
        </section>
        <section className="flex py-5 gap-x-3.5">
          <Badge2/>
          <div className="flex flex-col  w-[75%]">
            <Typo>피드백 마스터</Typo>
            <Typo color="gray2">피드백 작성을 1회 완료하세요.</Typo>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full w-[0%]"></div>
              </div>
              <Typo color="gray2" className="ml-2">
                0/1
              </Typo>
            </div>
          </div>
        </section>
        <section className="flex py-5 gap-x-3.5">
          <Badge3/>
          <div className="flex flex-col w-[75%]">
            <Typo>답장의 제왕</Typo>
            <Typo color="gray2">답장 작성을 1회 완료하세요.</Typo>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full w-0"></div>
              </div>
              <Typo color="gray2" className="ml-2">
                0/1
              </Typo>
            </div>
          </div>
        </section>
        <section className="flex py-5 gap-x-3.5">
          <Badge4/>
          <div className="flex flex-col w-[75%]">
            <Typo>우표의 제왕</Typo>
            <Typo color="gray2">종이 편지를 스캔해서 보내기를 1회 완성하세요.</Typo>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full w-[100%]"></div>
              </div>
              <Typo color="gray2" className="ml-2">
                1/1
              </Typo>
            </div>
          </div>
        </section>
        <section className="flex py-5 gap-x-3.5">
          <Badge5/>
          <div className="flex flex-col w-[75%]">
            <Typo>꾸준한 학습자</Typo>
            <Typo color="gray2">편지 보내기를 7일 연속 달성하세요</Typo>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                <div className="bg-yellow-400 h-2.5 rounded-full w-[14.2%]"></div>
              </div>
              <Typo color="gray2" className="ml-2">
                1/7
              </Typo>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}

export default UserBadge;