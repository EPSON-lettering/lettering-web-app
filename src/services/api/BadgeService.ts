import {jsonClient} from "@/services/api/client";
import {Badge, UserBadge} from "@/types/object";


interface BadgeService{
  getAllBadge: () => Promise<Badge[]>;
  getUserBadge: () => Promise<UserBadge[]>
}

const URL = '/badge';


const badgeService: BadgeService = {
  getAllBadge: async () => {
    const response = await jsonClient.get<Badge[]>(`${URL}/all`);
    return response.data;
  },
  getUserBadge: async () => {
    const response = await jsonClient.get<UserBadge[]>(`${URL}`);
    return response.data;
  },
};
export default badgeService;