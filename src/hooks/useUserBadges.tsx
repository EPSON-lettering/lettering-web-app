import {useEffect, useState} from 'react';
import badgeService from '@/services/api/';
import {MyBadge, UserBadge} from '@/types/object';

const useUserBadges = () => {
  const [userBadges, setUserBadges] = useState<UserBadge[] | null>(null);
  const [partnerBadges, setPartnerBadges] = useState<UserBadge[] | null>(null);
  const [myBadges, setMyBadges] = useState<MyBadge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserBadges = async () => {
      try {
        const badges = await badgeService.Badge.getUserBadge();
        const partnerbadges = await badgeService.Badge.getPartnerBadge();
        const myBadges = await badgeService.Badge.getMyBadge();
        setUserBadges(badges);
        setPartnerBadges(partnerbadges);
        setMyBadges(myBadges);
      } catch (error) {
        setError('Failed to fetch user badges');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBadges();
  }, []);

  return {userBadges, partnerBadges, myBadges, loading};
};

export default useUserBadges;