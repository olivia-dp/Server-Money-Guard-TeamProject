import {getCurrentUser} from "../services/user.js";


export const getCurrentUserController =  async (req, res) => {
    
    const user = await getCurrentUser(req.user.id);

    if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
 
  res.status(200).json({
    status: 200,
    message: 'User data fetched successfully',
    data: user,
  });
}