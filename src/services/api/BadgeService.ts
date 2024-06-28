import {jsonClient} from "@/services/api/client";
import {Badge, MyBadge, UserBadge} from "@/types/object";


interface BadgeService {
  getAllBadge: () => Promise<Badge[]>;
  getUserBadge: () => Promise<UserBadge[]>
  getPartnerBadge: () => Promise<UserBadge[]>;
  getMyBadge: () => Promise<MyBadge[]>;
}

const URL = '/badge';

const badgeService: BadgeService = {
  getPartnerBadge: () => jsonClient.get(`${URL}/partner`),
  getAllBadge: () => jsonClient.get(`${URL}/all`),
  getUserBadge: () => jsonClient.get(`${URL}`),
  getMyBadge: () => jsonClient.get(`${URL}/my`),
}


export default badgeService;